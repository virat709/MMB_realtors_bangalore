import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Phone, 
  User, 
  Mail, 
  Eye, 
  EyeOff,
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Search,
  Check,
  Download,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useLanguage } from '../context/LanguageContext';
import sellLandIllustration from '../assets/images/sell_land_illustration_1784009703506.jpg';
import buyLandIllustration from '../assets/images/buy_land_illustration_1784009719294.jpg';

// Error Handler helper as specified in the Firebase skill guidelines
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function LandHub() {
  const { language } = useLanguage();
  const isKn = language === 'kn';

  // Tabs: 'sell' | 'buy' | 'browse' | 'matchups' | 'admin'
  const [activeTab, setActiveTab] = useState<'sell' | 'buy' | 'browse' | 'matchups' | 'admin'>('browse');

  // Agency passcode protection state
  const [passcode, setPasscode] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Firestore reading states
  const [sellersList, setSellersList] = useState<any[]>([]);
  const [buyersList, setBuyersList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState('');

  // Search/Filter states for Admin
  const [adminSearch, setAdminSearch] = useState('');
  const [adminLocalityFilter, setAdminLocalityFilter] = useState('All');

  // Search/Filter states for Matchups
  const [matchupSearch, setMatchupSearch] = useState('');
  const [matchupTypeFilter, setMatchupTypeFilter] = useState('All');

  // Search/Filter states for Public Browse
  const [browseSearch, setBrowseSearch] = useState('');
  const [browseTypeFilter, setBrowseTypeFilter] = useState('All');
  const [browseBudgetFilter, setBrowseBudgetFilter] = useState('All');
  const [browseAreaFilter, setBrowseAreaFilter] = useState('All');

  // Form submit states for SELL
  const [sellForm, setSellForm] = useState({
    ownerName: '',
    phone: '',
    email: '',
    locality: '',
    landSize: '',
    facing: 'East',
    expectedPrice: '',
    khataType: 'A Khata',
    hasTitleDeed: true,
    surveyNumber: '',
    description: '',
    landType: 'Residential Plot'
  });
  const [sellSubmitting, setSellSubmitting] = useState(false);
  const [sellSuccess, setSellSuccess] = useState(false);
  const [sellError, setSellError] = useState('');
  const [sellRefId, setSellRefId] = useState('');

  // Form submit states for BUY
  const [buyForm, setBuyForm] = useState({
    buyerName: '',
    phone: '',
    email: '',
    preferredLocalities: '',
    minSize: '',
    maxBudget: '',
    preferredKhata: 'A Khata Only',
    purpose: 'Residential Construction',
    additionalInfo: '',
    landType: 'Residential Plot'
  });
  const [buySubmitting, setBuySubmitting] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [buyError, setBuyError] = useState('');
  const [buyRefId, setBuyRefId] = useState('');

  const bangaloreLocalities = [
    'Whitefield / Varthur',
    'Indiranagar / Hal',
    'Bellandur / Outer Ring Road',
    'HSR Layout / Koramangala',
    'Sarjapur Road / Kaikondrahalli',
    'Electronic City / Bommasandra',
    'Hebbal / Thanisandra',
    'Yelahanka / Devanahalli',
    'Jayanagar / JP Nagar',
    'Malleshwaram / Rajajinagar',
    'Kanakapura Road / Bannerghatta'
  ];

  const bangaloreLocalitiesKn = [
    'ವೈಟ್‌ಫೀಲ್ಡ್ / ವರ್ತೂರು',
    'ಇಂದಿರಾನಗರ / ಹೆಚ್ಎಎಲ್',
    'ಬೆಳ್ಳಂದೂರು / ಔಟರ್ ರಿಂಗ್ ರೋಡ್',
    'ಹೆಚ್ಎಸ್ಆರ್ ಲೇಔಟ್ / ಕೋರಮಂಗಲ',
    'ಸರ್ಜಾಪುರ ರಸ್ತೆ / ಕೈಕೊಂಡ್ರಹಳ್ಳಿ',
    'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ / ಬೊಮ್ಮಸಂದ್ರ',
    'ಹೆಬ್ಬಾಳ / ತನಿಶಂದ್ರ',
    'ಯಲಹಂಕ / ದೇವನಹಳ್ಳಿ',
    'ಜಯನಗರ / ಜೆಪಿ ನಗರ',
    'ಮಲ್ಲೇಶ್ವರಂ / ರಾಜಾಜಿನಗರ',
    'ಕನಕಪುರ ರಸ್ತೆ / ಬನ್ನೇರುಘಟ್ಟ'
  ];

  // Helper to format values to INR wording dynamically
  const formatPriceToINR = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) return '';
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Crores`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Fetch registered sellers and buyers from Firestore (Publicly available for matching)
  const fetchAllDataPublic = async () => {
    setLoadingList(true);
    setListError('');
    try {
      const sellersQuery = query(collection(db, 'land_sellers'), orderBy('createdAt', 'desc'));
      const buyersQuery = query(collection(db, 'land_buyers'), orderBy('createdAt', 'desc'));

      const [sellersSnap, buyersSnap] = await Promise.all([
        getDocs(sellersQuery).catch(err => { handleFirestoreError(err, OperationType.GET, 'land_sellers'); }),
        getDocs(buyersQuery).catch(err => { handleFirestoreError(err, OperationType.GET, 'land_buyers'); })
      ]);

      const sellers: any[] = [];
      if (sellersSnap) {
        sellersSnap.forEach((doc) => {
          sellers.push({ id: doc.id, ...doc.data() });
        });
      }

      const buyers: any[] = [];
      if (buyersSnap) {
        buyersSnap.forEach((doc) => {
          buyers.push({ id: doc.id, ...doc.data() });
        });
      }

      setSellersList(sellers);
      setBuyersList(buyers);
    } catch (err: any) {
      console.error(err);
      setListError(isKn ? 'ಮಾಹಿತಿ ತರಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಯಮಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.' : 'Failed to fetch registered land. Please check Firestore access.');
    } finally {
      setLoadingList(false);
    }
  };

  const fetchAdminData = fetchAllDataPublic;

  useEffect(() => {
    fetchAllDataPublic();
  }, []);

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(false);
    // Secure passcode check (MMB2026 or 1234)
    if (passcode === 'MMB2026' || passcode === '1234') {
      setIsAdminUnlocked(true);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    setPasscode('');
  };

  // Submit Land Seller info
  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSellError('');

    if (!sellForm.ownerName.trim()) {
      setSellError(isKn ? 'ದಯವಿಟ್ಟು ಮಾಲೀಕರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please enter the owner name.');
      return;
    }
    if (!sellForm.phone.trim() || sellForm.phone.length < 10) {
      setSellError(isKn ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!sellForm.locality) {
      setSellError(isKn ? 'ದಯವಿಟ್ಟು ಆಸ್ತಿ ಇರುವ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.' : 'Please select the property locality.');
      return;
    }
    if (!sellForm.landSize || isNaN(parseFloat(sellForm.landSize))) {
      setSellError(isKn ? 'ದಯವಿಟ್ಟು ಜಮೀನಿನ ಅಳತೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid land size in Sq. Ft.');
      return;
    }
    if (!sellForm.expectedPrice || isNaN(parseFloat(sellForm.expectedPrice))) {
      setSellError(isKn ? 'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿತ ಬೆಲೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid expected price.');
      return;
    }

    setSellSubmitting(true);
    const refNo = 'SELL-' + Math.floor(1000 + Math.random() * 9000);
    setSellRefId(refNo);

    try {
      const payload = {
        ownerName: sellForm.ownerName,
        phone: sellForm.phone,
        email: sellForm.email || '',
        locality: sellForm.locality,
        landSize: parseFloat(sellForm.landSize),
        facing: sellForm.facing,
        expectedPrice: parseFloat(sellForm.expectedPrice),
        khataType: sellForm.khataType,
        hasTitleDeed: sellForm.hasTitleDeed,
        surveyNumber: sellForm.surveyNumber || 'Not Specified',
        description: sellForm.description || '',
        landType: sellForm.landType || 'Residential Plot',
        createdAt: new Date().toISOString(),
        status: 'Active'
      };

      await addDoc(collection(db, 'land_sellers'), payload);
      setSellSuccess(true);
      fetchAllDataPublic();
    } catch (err: any) {
      console.error(err);
      try {
        handleFirestoreError(err, OperationType.WRITE, 'land_sellers');
      } catch (logErr) {}
      setSellError(isKn ? 'ಫೈರ್‌ಸ್ಟೋರ್ ಸಂಗ್ರಹ ವಿಫಲವಾಗಿದೆ. ಫೋನ್ ಮೂಲಕ ಸಲ್ಲಿಸಿ.' : 'Firestore submission failed. Please use WhatsApp fallback.');
    } finally {
      setSellSubmitting(false);
    }
  };

  // Submit Land Buyer info
  const handleBuySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBuyError('');

    if (!buyForm.buyerName.trim()) {
      setBuyError(isKn ? 'ದಯವಿಟ್ಟು ಖರೀದಿದಾರರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please enter the buyer name.');
      return;
    }
    if (!buyForm.phone.trim() || buyForm.phone.length < 10) {
      setBuyError(isKn ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!buyForm.preferredLocalities.trim()) {
      setBuyError(isKn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ.' : 'Please specify preferred localities.');
      return;
    }
    if (!buyForm.minSize || isNaN(parseFloat(buyForm.minSize))) {
      setBuyError(isKn ? 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಅಳತೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter minimum required land size.');
      return;
    }
    if (!buyForm.maxBudget || isNaN(parseFloat(buyForm.maxBudget))) {
      setBuyError(isKn ? 'ದಯವಿಟ್ಟು ಗರಿಷ್ಠ ಬಜೆಟ್ ಹಣವನ್ನು ನಮೂದಿಸಿ.' : 'Please enter maximum budget.');
      return;
    }

    setBuySubmitting(true);
    const refNo = 'BUY-' + Math.floor(1000 + Math.random() * 9000);
    setBuyRefId(refNo);

    try {
      const payload = {
        buyerName: buyForm.buyerName,
        phone: buyForm.phone,
        email: buyForm.email || '',
        preferredLocalities: buyForm.preferredLocalities,
        minSize: parseFloat(buyForm.minSize),
        maxBudget: parseFloat(buyForm.maxBudget),
        preferredKhata: buyForm.preferredKhata,
        purpose: buyForm.purpose,
        additionalInfo: buyForm.additionalInfo || '',
        landType: buyForm.landType || 'Residential Plot',
        createdAt: new Date().toISOString(),
        status: 'Active'
      };

      await addDoc(collection(db, 'land_buyers'), payload);
      setBuySuccess(true);
      fetchAllDataPublic();
    } catch (err: any) {
      console.error(err);
      try {
        handleFirestoreError(err, OperationType.WRITE, 'land_buyers');
      } catch (logErr) {}
      setBuyError(isKn ? 'ಫೈರ್‌ಸ್ಟೋರ್ ಸಂಗ್ರಹ ವಿಫಲವಾಗಿದೆ. ಫೋನ್ ಮೂಲಕ ಸಲ್ಲಿಸಿ.' : 'Firestore submission failed. Please use WhatsApp fallback.');
    } finally {
      setBuySubmitting(false);
    }
  };

  const getWhatsAppSellerLink = () => {
    const text = `🏡 *NEW LAND FOR SALE REGISTRATION*
----------------------------------------
🆔 *ID:* ${sellRefId}
👤 *Owner Name:* ${sellForm.ownerName}
📞 *Mobile:* ${sellForm.phone}
✉️ *Email:* ${sellForm.email || 'N/A'}
🏢 *Land Type:* ${sellForm.landType || 'Residential Plot'}
📍 *Locality:* ${sellForm.locality}
📐 *Size (Sq. Ft.):* ${sellForm.landSize}
🧭 *Facing:* ${sellForm.facing}
💰 *Expected Price:* ${formatPriceToINR(sellForm.expectedPrice)} (${sellForm.expectedPrice})
⚖️ *Khata:* ${sellForm.khataType}
📂 *Clear Title Deeds:* ${sellForm.hasTitleDeed ? 'Yes' : 'No'}
🔢 *Survey/Sy No:* ${sellForm.surveyNumber || 'N/A'}
📝 *Notes:* ${sellForm.description || 'None'}
----------------------------------------
Submitted via MMB Realtors Land Hub.`;
    return `https://wa.me/916366310992?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppBuyerLink = () => {
    const text = `🎯 *NEW LAND PURCHASE REQUIREMENT*
----------------------------------------
🆔 *ID:* ${buyRefId}
👤 *Buyer Name:* ${buyForm.buyerName}
📞 *Mobile:* ${buyForm.phone}
✉️ *Email:* ${buyForm.email || 'N/A'}
🏢 *Land Type:* ${buyForm.landType || 'Residential Plot'}
📍 *Desired Localities:* ${buyForm.preferredLocalities}
📐 *Min Size Required:* ${buyForm.minSize} Sq. Ft.
💰 *Max Budget:* ${formatPriceToINR(buyForm.maxBudget)} (${buyForm.maxBudget})
⚖️ *Preferred Khata:* ${buyForm.preferredKhata}
🎯 *Purpose:* ${buyForm.purpose}
📝 *Additional Info:* ${buyForm.additionalInfo || 'None'}
----------------------------------------
Submitted via MMB Realtors Land Hub.`;
    return `https://wa.me/916366310992?text=${encodeURIComponent(text)}`;
  };

  const resetSellForm = () => {
    setSellForm({
      ownerName: '',
      phone: '',
      email: '',
      locality: '',
      landSize: '',
      facing: 'East',
      expectedPrice: '',
      khataType: 'A Khata',
      hasTitleDeed: true,
      surveyNumber: '',
      description: '',
      landType: 'Residential Plot'
    });
    setSellSuccess(false);
    setSellRefId('');
  };

  const resetBuyForm = () => {
    setBuyForm({
      buyerName: '',
      phone: '',
      email: '',
      preferredLocalities: '',
      minSize: '',
      maxBudget: '',
      preferredKhata: 'A Khata Only',
      purpose: 'Residential Construction',
      additionalInfo: '',
      landType: 'Residential Plot'
    });
    setBuySuccess(false);
    setBuyRefId('');
  };

  const getWhatsAppEnquiryLink = (item: any) => {
    const text = `Hello MMB Realtors, I saw the following land listing on your Land Hub and want to request a callback/documents verification:

📍 *Listing ID:* ${item.id || 'N/A'}
👤 *Owner (Encrypted):* ${(item.ownerName || '').substring(0, 3)}***
📍 *Locality:* ${item.locality}
📐 *Size:* ${item.landSize} SqFt
🧭 *Facing:* ${item.facing}
💰 *Asking Price:* ${formatPriceToINR(String(item.expectedPrice))}
📂 *Khata Type:* ${item.khataType}
🔢 *Sy No:* ${item.surveyNumber || 'N/A'}

Please connect me with the owner and help me with the legal audit. Thank you!`;
    return `https://wa.me/916366310992?text=${encodeURIComponent(text)}`;
  };

  const getFilteredBrowseSellers = () => {
    return sellersList.filter(item => {
      // 1. Search filter
      const searchStr = browseSearch.toLowerCase().trim();
      const matchesSearch = !searchStr || 
        (item.ownerName || '').toLowerCase().includes(searchStr) ||
        (item.locality || '').toLowerCase().includes(searchStr) ||
        (item.description || '').toLowerCase().includes(searchStr) ||
        (item.surveyNumber || '').toLowerCase().includes(searchStr);

      // 2. Property type filter
      const matchesType = browseTypeFilter === 'All' || 
        (item.landType || '').toLowerCase() === browseTypeFilter.toLowerCase();

      // 3. Area/Locality filter
      const matchesArea = browseAreaFilter === 'All' || 
        (item.locality || '') === browseAreaFilter;

      // 4. Budget filter
      const price = parseFloat(item.expectedPrice);
      let matchesBudget = true;
      if (browseBudgetFilter === 'under-50l') {
        matchesBudget = price < 5000000;
      } else if (browseBudgetFilter === '50l-1c') {
        matchesBudget = price >= 5000000 && price <= 10000000;
      } else if (browseBudgetFilter === '1c-2c') {
        matchesBudget = price >= 10000000 && price <= 20000000;
      } else if (browseBudgetFilter === 'above-2c') {
        matchesBudget = price > 20000000;
      }

      return matchesSearch && matchesType && matchesArea && matchesBudget;
    });
  };

  // Filter listings for Agent view
  const filteredSellers = sellersList.filter(item => {
    const searchMatch = item.ownerName.toLowerCase().includes(adminSearch.toLowerCase()) || 
                        item.locality.toLowerCase().includes(adminSearch.toLowerCase()) ||
                        item.phone.includes(adminSearch);
    const localityMatch = adminLocalityFilter === 'All' || item.locality === adminLocalityFilter;
    return searchMatch && localityMatch;
  });

  const filteredBuyers = buyersList.filter(item => {
    const searchMatch = item.buyerName.toLowerCase().includes(adminSearch.toLowerCase()) || 
                        item.preferredLocalities.toLowerCase().includes(adminSearch.toLowerCase()) ||
                        item.phone.includes(adminSearch);
    const localityMatch = adminLocalityFilter === 'All' || item.preferredLocalities.toLowerCase().includes(adminLocalityFilter.toLowerCase());
    return searchMatch && localityMatch;
  });

  // Dynamically calculate matching pairs in memory based on Locality, Budget, and Land Type
  const getMatchups = () => {
    const matches: any[] = [];
    
    sellersList.forEach(seller => {
      buyersList.forEach(buyer => {
        // 1. Locality match:
        const sellerLoc = (seller.locality || '').toLowerCase().trim();
        const buyerLocs = (buyer.preferredLocalities || '').toLowerCase().trim();
        
        // Split preferredLocalities by comma to see if there is any overlap
        const isLocalityMatch = buyerLocs.includes(sellerLoc) || sellerLoc.includes(buyerLocs) || 
          buyerLocs.split(',').some((part: string) => {
            const trimmed = part.trim();
            if (!trimmed) return false;
            return sellerLoc.includes(trimmed) || trimmed.includes(sellerLoc);
          });

        if (!isLocalityMatch) return;

        // 2. Budget match:
        const isBudgetMatch = parseFloat(seller.expectedPrice) <= parseFloat(buyer.maxBudget) * 1.15; // 15% stretch budget allowed for matching

        if (!isBudgetMatch) return;

        // 3. Land type match:
        const sellerType = seller.landType || 'Residential Plot';
        const buyerType = buyer.landType || 'Residential Plot';
        const isTypeMatch = sellerType.toLowerCase() === buyerType.toLowerCase();

        if (!isTypeMatch) return;

        // Calculate score
        let score = 70; // Base score for passing filter
        if (parseFloat(seller.expectedPrice) <= parseFloat(buyer.maxBudget)) {
          score += 15; // Within strict budget
        }
        if (parseFloat(seller.landSize) >= parseFloat(buyer.minSize)) {
          score += 15; // Meets or exceeds min size requirements
        }

        matches.push({
          id: `${seller.id}-${buyer.id}`,
          seller,
          buyer,
          score,
          matchedLocality: seller.locality,
          matchedLandType: sellerType
        });
      });
    });

    // Sort matches by score desc
    return matches.sort((a, b) => b.score - a.score);
  };

  const allMatchups = getMatchups();
  const filteredMatchups = allMatchups.filter(match => {
    const sellerLoc = (match.seller.locality || '').toLowerCase();
    const buyerLocs = (match.buyer.preferredLocalities || '').toLowerCase();
    const landType = (match.matchedLandType || '').toLowerCase();

    const searchStr = matchupSearch.toLowerCase().trim();
    const matchesSearch = !searchStr || 
      sellerLoc.includes(searchStr) || 
      buyerLocs.includes(searchStr) ||
      match.seller.ownerName.toLowerCase().includes(searchStr) ||
      match.buyer.buyerName.toLowerCase().includes(searchStr);

    const matchesType = matchupTypeFilter === 'All' || 
      landType === matchupTypeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  // Export functions to trigger simple CSV download
  const downloadCSV = (type: 'sellers' | 'buyers') => {
    const list = type === 'sellers' ? filteredSellers : filteredBuyers;
    if (list.length === 0) return;

    let headers = [];
    let rows = [];

    if (type === 'sellers') {
      headers = ['ID', 'Owner Name', 'Phone', 'Email', 'Locality', 'Land Size (SqFt)', 'Facing', 'Expected Price (INR)', 'Khata Type', 'Title Deeds', 'Survey No', 'Created At'];
      rows = list.map(item => [
        item.id || '',
        item.ownerName || '',
        item.phone || '',
        item.email || '',
        item.locality || '',
        item.landSize || '',
        item.facing || '',
        item.expectedPrice || '',
        item.khataType || '',
        item.hasTitleDeed ? 'Yes' : 'No',
        item.surveyNumber || '',
        item.createdAt || ''
      ]);
    } else {
      headers = ['ID', 'Buyer Name', 'Phone', 'Email', 'Preferred Localities', 'Min Size (SqFt)', 'Max Budget (INR)', 'Preferred Khata', 'Purpose', 'Created At'];
      rows = list.map(item => [
        item.id || '',
        item.buyerName || '',
        item.phone || '',
        item.email || '',
        item.preferredLocalities || '',
        item.minSize || '',
        item.maxBudget || '',
        item.preferredKhata || '',
        item.purpose || '',
        item.createdAt || ''
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MMB_Land_${type === 'sellers' ? 'Sellers' : 'Buyers'}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="land-hub" className="py-24 bg-slate-900 border-t border-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 font-mono uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isKn ? 'ಆಸ್ತಿ ವಿನಿಮಯ' : 'Land Exchange Hub'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none uppercase">
            {isKn ? 'ನಿಮ್ಮ ಜಮೀನು ಮಾರಾಟ ಮಾಡಿ ಅಥವಾ ಖರೀದಿಸಿ' : 'Register Land To Sell & Buy requests'}
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            {isKn 
              ? 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಿಮ್ಮ ನಿವೇಶನ ಅಥವಾ ಕೃಷಿ ಭೂಮಿಯನ್ನು ಸುಲಭವಾಗಿ ಮಾರಾಟ ಮಾಡಿ. ಖರೀದಿದಾರರು ತಮಗೆ ಬೇಕಾದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ನಮ್ಮ ಮಾರುಕಟ್ಟೆ ತಜ್ಞರ ಸಹಾಯ ಪಡೆಯಿರಿ.' 
              : 'Direct connection desk. Register your land to sell, or lodge land buying requirements. MMB Realtors collects, verifies, and matches prospective Bangalore sellers and buyers instantly.'}
          </p>
        </div>

        {/* Dynamic Tab Selector Card */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header Switcher Row */}
          <div className="flex border-b border-slate-800 flex-col lg:flex-row bg-slate-950">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex-1 py-5 px-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 lg:border-b-0 cursor-pointer text-center flex items-center justify-center space-x-2.5 ${
                activeTab === 'browse' 
                  ? 'border-amber-400 text-amber-400 bg-slate-900/40' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/10'
              }`}
            >
              <Search className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{isKn ? 'ಆಸ್ತಿಗಳ ಶೋಧನೆ' : 'Browse Listings'}</span>
            </button>

            <button
              onClick={() => setActiveTab('sell')}
              className={`flex-1 py-5 px-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 lg:border-b-0 cursor-pointer text-center flex items-center justify-center space-x-2.5 ${
                activeTab === 'sell' 
                  ? 'border-amber-400 text-amber-400 bg-slate-900/40' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/10'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>{isKn ? 'ಜಮೀನು ಮಾರಾಟ ಮಾಡಿ' : 'Register Land to Sell'}</span>
            </button>

            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 py-5 px-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 lg:border-b-0 cursor-pointer text-center flex items-center justify-center space-x-2.5 ${
                activeTab === 'buy' 
                  ? 'border-amber-400 text-amber-400 bg-slate-900/40' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/10'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>{isKn ? 'ಜಮೀನು ಖರೀದಿಸಿ' : 'Register Buy Requirements'}</span>
            </button>

            <button
              onClick={() => setActiveTab('matchups')}
              className={`flex-1 py-5 px-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 lg:border-b-0 cursor-pointer text-center flex items-center justify-center space-x-2.5 ${
                activeTab === 'matchups' 
                  ? 'border-amber-400 text-amber-400 bg-slate-900/40' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/10'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{isKn ? 'ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚ್‌ಅಪ್ಸ್' : 'Smart Matchups'}</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-5 px-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 lg:border-b-0 cursor-pointer text-center flex items-center justify-center space-x-2.5 ${
                activeTab === 'admin' 
                  ? 'border-amber-400 text-amber-400 bg-slate-900/40' 
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/10'
              }`}
            >
              <Database className="w-4 h-4 shrink-0" />
              <span>{isKn ? 'ಏಜೆನ್ಸಿ ಡೆಸ್ಕ್ (ಲಿಸ್ಟಿಂಗ್ಸ್)' : 'Agency Desk (Get Listings)'}</span>
            </button>
          </div>

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              
              {/* TAB 0: BROWSE LAND LISTINGS (NEW FILTER INTERFACE) */}
              {activeTab === 'browse' && (
                <motion.div
                  key="browse-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Visual Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full text-xs font-bold text-amber-400 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>{isKn ? 'ಸಂಪೂರ್ಣ ಪರಿಶೀಲಿಸಿದ ಪತ್ರಗಳು' : '100% Pre-Audit Verification'}</span>
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-wider font-mono">
                        {isKn ? '🔍 ಸಕ್ರಿಯ ಜಮೀನು ಆಸ್ತಿಗಳು' : '🔍 Active Land Listings'}
                      </h3>
                      <p className="text-sm text-slate-300 max-w-2xl leading-relaxed mt-1">
                        {isKn 
                          ? 'ಬ್ರೋಕರ್ ಇಲ್ಲದ ನೇರ ಮಾಲೀಕರ ಜಮೀನುಗಳ ಪಟ್ಟಿ. ನಿಮ್ಮ ಬಜೆಟ್ ಹಾಗೂ ಸ್ಥಳಕ್ಕೆ ತಕ್ಕಂತೆ ಶೋಧಿಸಿ.'
                          : 'Explore directly registered seller assets with verified title deeds. Filter down to find your ideal investment in seconds.'}
                      </p>
                    </div>

                    <button
                      onClick={fetchAllDataPublic}
                      className="px-5 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-white rounded-xl flex items-center justify-center space-x-2 shrink-0 cursor-pointer transition-colors"
                    >
                      <span className="animate-spin text-amber-400 h-3.5 w-3.5 border-2 border-amber-400 border-t-transparent rounded-full" style={{ animationDuration: '1.5s', display: loadingList ? 'inline-block' : 'none' }}></span>
                      {!loadingList && <span>🔄</span>}
                      <span>{isKn ? 'ತಾಜಾ ಮಾಹಿತಿ ತನ್ನಿ' : 'Reload Land Listings'}</span>
                    </button>
                  </div>

                  {/* VISUAL ACCESSIBLE SEARCH & FILTER INTERFACE */}
                  <div className="bg-slate-950/80 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                      
                      {/* Search Keyword Filter */}
                      <div className="md:col-span-5 space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                          <Search className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isKn ? 'ಪ್ರದೇಶ ಅಥವಾ ವಿವರಗಳಿಂದ ಹುಡುಕಿ' : 'Search Locality / Keyword'}</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder={isKn ? 'ಉದಾ: Devanahalli, A Khata, Sy No...' : 'e.g. Devanahalli, Sarjapur, A Khata, Sy No...'}
                            value={browseSearch}
                            onChange={(e) => setBrowseSearch(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder-slate-500"
                          />
                          {browseSearch && (
                            <button 
                              onClick={() => setBrowseSearch('')}
                              className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white text-xs cursor-pointer"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Locality Dropdown Filter */}
                      <div className="md:col-span-4 space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isKn ? 'ಬೆಂಗಳೂರು ನಿರ್ದಿಷ್ಟ ಬಡಾವಣೆ' : 'Select Bengaluru Locality'}</span>
                        </label>
                        <select
                          value={browseAreaFilter}
                          onChange={(e) => setBrowseAreaFilter(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        >
                          <option value="All">{isKn ? 'ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು (All Localities)' : 'All Areas (Any Locality)'}</option>
                          {bangaloreLocalities.map((loc, idx) => (
                            <option key={idx} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>

                      {/* Quick Reset Button */}
                      <div className="md:col-span-3">
                        <button
                          onClick={() => {
                            setBrowseSearch('');
                            setBrowseTypeFilter('All');
                            setBrowseBudgetFilter('All');
                            setBrowseAreaFilter('All');
                          }}
                          className="w-full py-3 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-xs text-slate-400 hover:text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                        >
                          🧹 {isKn ? 'ಶೋಧನೆ ರದ್ದುಮಾಡಿ' : 'Clear All Filters'}
                        </button>
                      </div>

                    </div>

                    {/* Property Type Grid Filter (Visual Chips) */}
                    <div className="space-y-3 pt-2">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono block">
                        🏢 {isKn ? 'ಜಮೀನಿನ ಪ್ರಕಾರ ಆರಿಸಿ:' : 'Filter by Land / Property Type:'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'All', label: isKn ? 'ಎಲ್ಲಾ ಆಸ್ತಿಗಳು' : 'All Types', emoji: '🏢' },
                          { id: 'Residential Plot', label: isKn ? 'ವಸತಿ ನಿವೇಶನ' : 'Residential Plot', emoji: '🏡' },
                          { id: 'Apartment Land', label: isKn ? 'ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ನಿವೇಶನ' : 'Apartment Land', emoji: '🏢' },
                          { id: 'Commercial Land', label: isKn ? 'ವಾಣಿಜ್ಯ ಜಮೀನು' : 'Commercial Land', emoji: '🏭' },
                          { id: 'Agricultural Land', label: isKn ? 'ಕೃಷಿ ಭೂಮಿ' : 'Agricultural Land', emoji: '🌾' },
                          { id: 'Villa Plot', label: isKn ? 'ವಿಲ್ಲಾ ಪ್ಲಾಟ್' : 'Villa Plot', emoji: '🏰' }
                        ].map((type) => {
                          const isActive = browseTypeFilter === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setBrowseTypeFilter(type.id)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center space-x-1.5 border cursor-pointer ${
                                isActive 
                                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-400/10' 
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                              }`}
                            >
                              <span>{type.emoji}</span>
                              <span>{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget Tier Grid Filter (Visual Segment) */}
                    <div className="space-y-3 pt-2">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono block">
                        💰 {isKn ? 'ಬಜೆಟ್ ವ್ಯಾಪ್ತಿ ಆಯ್ಕೆಮಾಡಿ:' : 'Filter by Budget Range:'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {[
                          { id: 'All', label: isKn ? 'ಯಾವುದೇ ಬಜೆಟ್' : 'Any Budget', desc: 'No Price Limit' },
                          { id: 'under-50l', label: isKn ? '₹೫೦ ಲಕ್ಷ ಒಳಗಡೆ' : 'Under ₹50L', desc: '< 50 Lakhs' },
                          { id: '50l-1c', label: isKn ? '₹೫೦ಲಕ್ಷ - ₹೧ ಕೋಟಿ' : '₹50L - ₹1 Crore', desc: '50L to 100L' },
                          { id: '1c-2c', label: isKn ? '₹೧ಕೋಟಿ - ₹೨ ಕೋಟಿ' : '₹1C - ₹2 Crores', desc: '100L to 200L' },
                          { id: 'above-2c', label: isKn ? '₹೨ ಕೋಟಿ ಮೇಲ್ಪಟ್ಟು' : 'Above ₹2 Crores', desc: '> 2 Crores' }
                        ].map((tier) => {
                          const isActive = browseBudgetFilter === tier.id;
                          return (
                            <button
                              key={tier.id}
                              onClick={() => setBrowseBudgetFilter(tier.id)}
                              className={`p-3.5 rounded-2xl text-left border cursor-pointer transition-all flex flex-col justify-between ${
                                isActive 
                                  ? 'bg-indigo-500/10 text-white border-indigo-500 shadow-md' 
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                              }`}
                            >
                              <span className="text-xs font-black font-mono">{tier.label}</span>
                              <span className="text-[9px] text-slate-500 mt-0.5">{tier.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Listings Grid Result Rendering */}
                  {loadingList ? (
                    <div className="text-center py-20 text-slate-500 font-mono text-xs">
                      <Clock className="w-8 h-8 mx-auto mb-3 text-amber-400 animate-spin" />
                      <span>{isKn ? 'ಫೈರ್‌ಸ್ಟೋರ್ ಡೇಟಾಬೇಸ್‌ನಿಂದ ಜಮೀನುಗಳನ್ನು ತರಲಾಗುತ್ತಿದೆ...' : 'Connecting to MMB live cloud database...'}</span>
                    </div>
                  ) : getFilteredBrowseSellers().length === 0 ? (
                    <div className="text-center py-16 max-w-lg mx-auto bg-slate-950/30 border border-dashed border-slate-800 rounded-3xl p-8 space-y-4">
                      <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white uppercase font-mono">
                          {isKn ? 'ಯಾವುದೇ ಜಮೀನು ಸಿಕ್ಕಿಲ್ಲ' : 'No Listings Found'}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {isKn 
                            ? 'ನೀವು ಆಯ್ಕೆಮಾಡಿದ ಶೋಧನೆಗೆ ಸರಿಹೊಂದುವ ಜಮೀನುಗಳು ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ. ಶೋಧಕಗಳನ್ನು ಬದಲಾಯಿಸಿ ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
                            : 'No property sellers matched your filter setup. Try clearing filters or resetting the area selection.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-6 text-xs text-slate-400 font-mono">
                        <span>{isKn ? 'ಒಟ್ಟು ಶೋಧನೆಯಾದ ಆಸ್ತಿಗಳು:' : 'Filtered Results Found:'} <strong className="text-amber-400">{getFilteredBrowseSellers().length}</strong></span>
                        <span>{isKn ? 'ದಾಖಲೆಗಳು: ಸುರಕ್ಷಿತ' : 'Safety Check: Guaranteed'}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredBrowseSellers().map((item: any, idx: number) => {
                          const formattedPrice = formatPriceToINR(String(item.expectedPrice));
                          const censoredName = (item.ownerName || '').trim();
                          const displayName = censoredName.length <= 3 ? `${censoredName}***` : `${censoredName.substring(0, 3)}***`;

                          return (
                            <motion.div
                              key={item.id || idx}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-slate-950/90 border border-slate-850 hover:border-slate-700 hover:shadow-xl rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
                            >
                              {/* Card Header */}
                              <div className="p-5 border-b border-slate-850 bg-slate-950 flex items-start justify-between">
                                <div className="space-y-1">
                                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase font-mono tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                    🏢 {item.landType || 'Residential Plot'}
                                  </span>
                                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center pt-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mr-1" />
                                    <span className="truncate">{item.locality}</span>
                                  </h4>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-slate-500 font-mono">Asking Price</div>
                                  <div className="text-base font-black text-amber-400 font-mono tracking-tight">{formattedPrice}</div>
                                </div>
                              </div>

                              {/* Card Body Specs Grid */}
                              <div className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-2.5 bg-slate-900/50 border border-slate-850 rounded-xl space-y-0.5">
                                    <div className="text-[9px] text-slate-500 uppercase font-bold font-mono">📐 Land Size</div>
                                    <div className="text-xs font-black text-white font-mono">{item.landSize?.toLocaleString()} Sq.Ft.</div>
                                  </div>

                                  <div className="p-2.5 bg-slate-900/50 border border-slate-850 rounded-xl space-y-0.5">
                                    <div className="text-[9px] text-slate-500 uppercase font-bold font-mono">🧭 Facing</div>
                                    <div className="text-xs font-bold text-slate-300 font-mono">{item.facing || 'East'}</div>
                                  </div>

                                  <div className="p-2.5 bg-slate-900/50 border border-slate-850 rounded-xl space-y-0.5">
                                    <div className="text-[9px] text-slate-500 uppercase font-bold font-mono">📂 Khata Status</div>
                                    <div className="text-xs font-bold text-slate-300 truncate" title={item.khataType}>{item.khataType || 'A Khata'}</div>
                                  </div>

                                  <div className="p-2.5 bg-slate-900/50 border border-slate-850 rounded-xl space-y-0.5">
                                    <div className="text-[9px] text-slate-500 uppercase font-bold font-mono">🔢 Survey Number</div>
                                    <div className="text-xs font-bold text-slate-300 font-mono truncate">{item.surveyNumber && item.surveyNumber !== 'Not Specified' ? item.surveyNumber : 'Verified'}</div>
                                  </div>
                                </div>

                                {/* Custom notes preview */}
                                {item.description && (
                                  <p className="text-[11px] text-slate-400 leading-normal line-clamp-2 italic bg-slate-900/10 p-2 rounded-lg border border-slate-900">
                                    " {item.description} "
                                  </p>
                                )}

                                {/* Legal verification status indicator */}
                                <div className="flex items-center space-x-2 bg-emerald-500/5 border border-emerald-500/10 p-2 rounded-xl">
                                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />
                                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5">
                                    <span>🛡️ {isKn ? 'ದಾಖಲೆಗಳು ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿವೆ' : 'MMB Legal Pre-Audited'}</span>
                                  </span>
                                </div>
                              </div>

                              {/* Card Footer Enquiry Action */}
                              <div className="px-5 pb-5 pt-0">
                                <a
                                  href={getWhatsAppEnquiryLink(item)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black font-mono uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-400/5 transition-all cursor-pointer"
                                >
                                  <span>📞 {isKn ? 'ಪತ್ರ ಪರಿಶೀಲನೆ ಹಾಗೂ ಖರೀದಿಸಿ' : 'Verify & Purchase'}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 1: SELL LAND FORM */}
              {activeTab === 'sell' && (
                <motion.div
                  key="sell-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {!sellSuccess ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                      
                      {/* Left: Sell Form */}
                      <form onSubmit={handleSellSubmit} className="lg:col-span-7 space-y-6">
                      <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/15 flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಜಮೀನಿನ ಎಲ್ಲಾ ನಿಖರ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ. ಇದು ಫೈರ್‌ಸ್ಟೋರ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲ್ಪಡುತ್ತದೆ ಮತ್ತು ನಾವು ತಕ್ಷಣ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.'
                            : 'Provide absolute legal boundaries, pricing, and document attributes. Form updates instantly sync to MMB verified cloud registers so our legal team can get, inspect, and map them.'}
                        </p>
                      </div>

                      {sellError && (
                        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center space-x-2.5 text-rose-400 text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{sellError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Owner Name */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಮಾಲೀಕರ ಪೂರ್ಣ ಹೆಸರು' : 'Land Owner Name'} *</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Anand Kumar"
                            value={sellForm.ownerName}
                            onChange={(e) => setSellForm({ ...sellForm, ownerName: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ (ಮೊಬೈಲ್)' : 'Mobile Phone'} *</span>
                          </label>
                          <input
                            type="tel"
                            required
                            maxLength={15}
                            placeholder="e.g. 9845012345"
                            value={sellForm.phone}
                            onChange={(e) => setSellForm({ ...sellForm, phone: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span>{isKn ? 'ಇಮೇಲ್ ವಿಳಾಸ' : 'Email Address'} (Optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. owner@example.com"
                            value={sellForm.email}
                            onChange={(e) => setSellForm({ ...sellForm, email: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Bangalore Locality */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಆಸ್ತಿ ಇರುವ ಬೆಂಗಳೂರಿನ ಪ್ರದೇಶ' : 'Bangalore Locality'} *</span>
                          </label>
                          <select
                            value={sellForm.locality}
                            onChange={(e) => setSellForm({ ...sellForm, locality: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="">{isKn ? '-- ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ --' : '-- Select Locality --'}</option>
                            {(isKn ? bangaloreLocalitiesKn : bangaloreLocalities).map((loc, idx) => (
                              <option key={idx} value={bangaloreLocalities[idx]}>{loc}</option>
                            ))}
                          </select>
                        </div>

                        {/* Land Size */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <Layers className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಚದರ ಅಡಿಗಳಲ್ಲಿ)' : 'Land Area (in Sq. Ft.)'} *</span>
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 1200, 2400, 4000"
                            value={sellForm.landSize}
                            onChange={(e) => setSellForm({ ...sellForm, landSize: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Facing direction */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>🧭 {isKn ? 'ಮುಖ (ದಿಕ್ಕು)' : 'Plot Facing'}</span>
                          </label>
                          <select
                            value={sellForm.facing}
                            onChange={(e) => setSellForm({ ...sellForm, facing: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="East">East</option>
                            <option value="West">West</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="North-East">North-East</option>
                            <option value="South-East">South-East</option>
                            <option value="North-West">North-West</option>
                            <option value="South-West">South-West</option>
                          </select>
                        </div>

                        {/* Expected Price */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>💰 {isKn ? 'ಒಟ್ಟು ನಿರೀಕ್ಷಿತ ಬೆಲೆ (ರೂಪಾಯಿಗಳಲ್ಲಿ)' : 'Expected Price (Total INR)'} *</span>
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 6000000 (for 60 Lakhs)"
                            value={sellForm.expectedPrice}
                            onChange={(e) => setSellForm({ ...sellForm, expectedPrice: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                          {sellForm.expectedPrice && (
                            <p className="text-xs text-amber-400 font-mono font-bold">
                              Formatted: {formatPriceToINR(sellForm.expectedPrice)}
                            </p>
                          )}
                        </div>

                        {/* Khata Type */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>📂 {isKn ? 'ಖಾತಾ ಪ್ರಕಾರ' : 'Khata Certification'} *</span>
                          </label>
                          <select
                            value={sellForm.khataType}
                            onChange={(e) => setSellForm({ ...sellForm, khataType: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="A Khata">A Khata (BBMP)</option>
                            <option value="B Khata">B Khata (BBMP / DC Converted)</option>
                            <option value="E-Khata">E-Khata (Gram Panchayat)</option>
                            <option value="Panchayat 9/11">Panchayat Form 9 & 11</option>
                            <option value="Pahani / RTC">Agricultural Pahani / RTC / MR</option>
                            <option value="BDA / BMRDA Approved">BDA / BMRDA Approved Layout</option>
                          </select>
                        </div>

                        {/* Land Type */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>🏢 {isKn ? 'ಜಮೀನಿನ ಪ್ರಕಾರ / ವಿಧ' : 'Type of Land'} *</span>
                          </label>
                          <select
                            value={sellForm.landType || 'Residential Plot'}
                            onChange={(e) => setSellForm({ ...sellForm, landType: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="Residential Plot">{isKn ? 'ವಸತಿ ನಿವೇಶನ (ಫ್ಲಾಟ್/ಲೇಔಟ್)' : 'Residential Plot (Flat/Layout)'}</option>
                            <option value="Apartment Land">{isKn ? 'ಅಪಾರ್ಟ್‌ಮೆಂಟ್/ಫ್ಲಾಟ್ ಜಮೀನು' : 'Apartment/Flat Development Land'}</option>
                            <option value="Commercial Land">{isKn ? 'ವಾಣಿಜ್ಯ ಜಮೀನು' : 'Commercial Land'}</option>
                            <option value="Agricultural Land">{isKn ? 'ಕೃಷಿ ಭೂಮಿ' : 'Agricultural Land / Acreage'}</option>
                            <option value="Villa Plot">{isKn ? 'ವಿಲ್ಲಾ ನಿವೇಶನ' : 'Villa Plot'}</option>
                          </select>
                        </div>

                        {/* Survey Number */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>🔢 {isKn ? 'ಸರ್ವೇ ನಂಬರ್ (ಐಚ್ಛಿಕ)' : 'Survey Number / Sy No.'} (Optional)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Sy No 14/2A"
                            value={sellForm.surveyNumber}
                            onChange={(e) => setSellForm({ ...sellForm, surveyNumber: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Checkbox Title deeds */}
                        <div className="flex items-center space-x-3 pt-6">
                          <input
                            type="checkbox"
                            id="hasTitleDeed"
                            checked={sellForm.hasTitleDeed}
                            onChange={(e) => setSellForm({ ...sellForm, hasTitleDeed: e.target.checked })}
                            className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-amber-400 focus:ring-amber-500"
                          />
                          <label htmlFor="hasTitleDeed" className="text-xs text-slate-300 font-medium cursor-pointer select-none">
                            {isKn ? 'ನನ್ನ ಬಳಿ ತಾಯಿ ಪತ್ರ ಮತ್ತು ಅಸಲಿ ಕ್ರಯ ಪತ್ರಗಳಿವೆ.' : 'I have clear Title deeds, Mother deeds & up-to-date EC.'}
                          </label>
                        </div>

                      </div>

                      {/* Description Textarea */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                          <span>📝 {isKn ? 'ಹೆಚ್ಚಿನ ವಿವರಗಳು / ಜಮೀನಿನ ಗಡಿಗಳು' : 'Additional Land Details / Boundary Specs'}</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder={isKn ? 'ಜಮೀನಿನ ಗಡಿಗಳು, ದಾರಿ, ಸಮೀಪದ ಗುರುತುಗಳು ಇತ್ಯಾದಿ...' : 'Specify boundaries (East-West layout), physical access roads, close landmarks, and any specific notes.'}
                          value={sellForm.description}
                          onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
                          className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                        ></textarea>
                      </div>

                      <div className="pt-2 text-right">
                        <button
                          type="submit"
                          disabled={sellSubmitting}
                          className="px-8 py-4 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black font-mono text-xs uppercase tracking-wider rounded-xl inline-flex items-center space-x-2 cursor-pointer shadow-lg shadow-amber-400/10"
                        >
                          {sellSubmitting ? (
                            <span>{isKn ? 'ಉಳಿತಾಯವಾಗುತ್ತಿದೆ...' : 'Saving Listing...'}</span>
                          ) : (
                            <>
                              <span>{isKn ? 'ಜಮೀನು ನೋಂದಾಯಿಸಿ' : 'Register Land To Sell'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </form>

                    {/* Right: Beautiful Photo and Animated Process Tracker */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6">
                        
                        {/* Image Box */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
                          <img 
                            src={sellLandIllustration} 
                            alt="Bangalore prime residential plot" 
                            className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider font-mono shadow-md">
                            {isKn ? 'ನೈಜ ಚಿತ್ರಣ' : 'PRIME PLOTS'}
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <span className="text-[10px] text-amber-400 block font-mono font-bold uppercase tracking-wider">
                              {isKn ? 'ಸ್ಥಳೀಯ ಪರಿಶೀಲನೆ' : 'On-Site Verification'}
                            </span>
                            <span className="text-xs text-white font-bold block">
                              {isKn ? 'ಸ್ವಚ್ಛ ಶೀರ್ಷಿಕೆ ಹೊಂದಿರುವ ನಿವೇಶನಗಳು' : 'Vetted Boundaries & Clean Titles'}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Steps Animation */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase font-mono text-slate-300 tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>{isKn ? 'ನಮ್ಮ ನೋಂದಣಿ ಮತ್ತು ಪರಿಶೀಲನೆ ಪ್ರಕ್ರಿಯೆ' : 'How We Process Your Listing'}</span>
                          </h4>

                          <div className="space-y-4">
                            
                            {/* Step 1 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white uppercase tracking-wide">
                                  {isKn ? '೧. ದಾಖಲೆಗಳ ತಪಾಸಣೆ (EC & Deeds)' : '1. Title Deed Audit (30-Year Chain)'}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ನಮ್ಮ ಕಾನೂನು ತಜ್ಞರು ತಾಯಿ ಪತ್ರ ಮತ್ತು ಇತ್ತೀಚಿನ ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರವನ್ನು (EC) ಕೂಲಂಕಷವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.'
                                    : 'Our panel lawyers audit parent deeds, Form 15 EC, and land conversion logs to assure clean titles.'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 animate-pulse" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white uppercase tracking-wide">
                                  {isKn ? '೨. ಖಾತಾ ದೃಢೀಕರಣ (A-Khata Check)' : '2. Khata Authenticity Check'}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ಬಿಬಿಎಂಪಿ ಎ-ಖಾತಾ, ಇ-ಖಾತಾ ಅಥವಾ ಕಂದಾಯ ದಾಖಲೆಗಳ ನೈಜತೆಯನ್ನು ಆಯಾ ಕಚೇರಿಗಳಲ್ಲಿ ದೃಢೀಕರಿಸಲಾಗುತ್ತದೆ.'
                                    : 'Verify BBMP/BMRDA Khata logs and DC conversion orders for financial clearance.'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-amber-500/15 text-amber-400 rounded-lg shrink-0 mt-0.5">
                                <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                                  {isKn ? '೩. ಗಡಿ ಗುರುತು ಮತ್ತು ಸ್ಥಳ ಪರಿಶೀಲನೆ' : '3. On-Site Physical Survey'}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ನಮ್ಮ ಪ್ರತಿನಿಧಿಗಳು ಸ್ಥಳಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ನಿಖರ ಗಡಿಗಳನ್ನು ಗುರುತಿಸಿ ರಸ್ತೆ ಸಂಪರ್ಕಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.'
                                    : 'Verify physical measurements, coordinates, access roads, and layout status.'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Step 4 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.7 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-slate-800 text-slate-400 rounded-lg shrink-0 mt-0.5">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                                  {isKn ? '೪. ಸಕ್ರಿಯ ಖರೀದಿದಾರರ ನಕ್ಷೆ' : '4. Prospective Buyer Mapping'}
                                </h5>
                                <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ದಾಖಲೆಗಳು ಸರಿಯಾಗಿರುವ ನಿವೇಶನಗಳನ್ನು ನಮ್ಮ ನೋಂದಾಯಿತ ಸಕ್ರಿಯ ಖರೀದಿದಾರರೊಂದಿಗೆ ತಕ್ಷಣ ಹೊಂದಾಣಿಕೆ ಮಾಡಲಾಗುತ್ತದೆ.'
                                    : 'Direct matching with our list of verified high-intent buyers looking for plots in the same locality.'}
                                </p>
                              </div>
                            </motion.div>

                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  ) : (
                    <div className="text-center py-12 max-w-lg mx-auto space-y-6">
                      <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2.5">
                        <h4 className="text-xl font-bold text-white">
                          {isKn ? 'ಜಮೀನು ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ!' : 'Land Registered Successfully!'}
                        </h4>
                        <p className="text-xs text-slate-400">
                          ID: <span className="font-mono text-amber-400 font-black">{sellRefId}</span>
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ನಿಮ್ಮ ಜಮೀನಿನ ವಿವರಗಳು ನಮ್ಮ ಸುರಕ್ಷಿತ ಫೈರ್‌ಸ್ಟೋರ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸೇರ್ಪಡೆಯಾಗಿವೆ. ಇದನ್ನು ನಮ್ಮ ಕಾನೂನು ಅಧಿಕಾರಿಗಳು ಈಗಲೇ ಪರಿಶೀಲಿಸಬಹುದು.'
                            : 'All legal specs have been written directly to our live database registers. To initiate instant buyer mapping, tap the dispatch button to alert our advisory desk on WhatsApp.'}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <button
                          onClick={resetSellForm}
                          className="px-6 py-3 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 font-mono text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                        >
                          {isKn ? 'ಮತ್ತೊಂದು ನೋಂದಣಿ' : 'Register Another'}
                        </button>

                        <a
                          href={getWhatsAppSellerLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black font-mono text-xs uppercase tracking-wider rounded-xl inline-flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{isKn ? 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ' : 'Send via WhatsApp'}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 2: BUY REQUIREMENTS FORM */}
              {activeTab === 'buy' && (
                <motion.div
                  key="buy-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {!buySuccess ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                      
                      {/* Left: Buy Form */}
                      <form onSubmit={handleBuySubmit} className="lg:col-span-7 space-y-6">
                      <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/15 flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಿವೇಶನ ಅಥವಾ ಜಮೀನು ಕೊಳ್ಳಲು ನಿಮ್ಮ ಅಗತ್ಯತೆಗಳನ್ನು ನೋಂದಾಯಿಸಿ. ನಾವು ನಮ್ಮ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿರುವ ಸರಿಯಾದ ಆಸ್ತಿಗಳನ್ನು ಮ್ಯಾಪ್ ಮಾಡುತ್ತೇವೆ.'
                            : 'Submit details of the plot or agricultural acreage you wish to acquire. MMB will verify corresponding layouts and alert matching sellers automatically.'}
                        </p>
                      </div>

                      {buyError && (
                        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center space-x-2.5 text-rose-400 text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{buyError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Buyer Name */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಖರೀದಿದಾರರ ಪೂರ್ಣ ಹೆಸರು' : 'Buyer Name'} *</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Prasad"
                            value={buyForm.buyerName}
                            onChange={(e) => setBuyForm({ ...buyForm, buyerName: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Mobile Phone'} *</span>
                          </label>
                          <input
                            type="tel"
                            required
                            maxLength={15}
                            placeholder="e.g. 9163663109"
                            value={buyForm.phone}
                            onChange={(e) => setBuyForm({ ...buyForm, phone: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span>{isKn ? 'ಇಮೇಲ್ ವಿಳಾಸ' : 'Email Address'} (Optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. buyer@example.com"
                            value={buyForm.email}
                            onChange={(e) => setBuyForm({ ...buyForm, email: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Desired Localities */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಬಯಸುವ ಪ್ರದೇಶಗಳು (ಬೆಂಗಳೂರು)' : 'Desired Bangalore Localities'} *</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Devanahalli, Yelahanka, Whitefield"
                            value={buyForm.preferredLocalities}
                            onChange={(e) => setBuyForm({ ...buyForm, preferredLocalities: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Min Size Required */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <Layers className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಕನಿಷ್ಠ ಅಳತೆ ಬೇಕು (ಚದರ ಅಡಿಗಳಲ್ಲಿ)' : 'Min Size Required (in Sq. Ft.)'} *</span>
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 1200, 2400"
                            value={buyForm.minSize}
                            onChange={(e) => setBuyForm({ ...buyForm, minSize: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        {/* Max Budget */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>💰 {isKn ? 'ಗರಿಷ್ಠ ಬಜೆಟ್ (ರೂಪಾಯಿಗಳಲ್ಲಿ)' : 'Max Budget (Total INR)'} *</span>
                          </label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 15000000 (for 1.5 Crores)"
                            value={buyForm.maxBudget}
                            onChange={(e) => setBuyForm({ ...buyForm, maxBudget: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                          {buyForm.maxBudget && (
                            <p className="text-xs text-amber-400 font-mono font-bold">
                              Formatted: {formatPriceToINR(buyForm.maxBudget)}
                            </p>
                          )}
                        </div>

                        {/* Preferred Khata Type */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>📂 {isKn ? 'ಆದ್ಯತೆಯ ಖಾತಾ ವಿಧ' : 'Preferred Khata Type'}</span>
                          </label>
                          <select
                            value={buyForm.preferredKhata}
                            onChange={(e) => setBuyForm({ ...buyForm, preferredKhata: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="A Khata Only">A Khata Only (BBMP / BDA)</option>
                            <option value="A or B Khata">Any BBMP Khata (A or B)</option>
                            <option value="Gram Panchayat E-Khata">Gram Panchayat E-Khata OK</option>
                            <option value="DC Converted Plot">DC Converted Layout OK</option>
                            <option value="Agricultural RTC">Agricultural Land (RTC/RTC Pahani)</option>
                          </select>
                        </div>

                        {/* Land Type */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>🏢 {isKn ? 'ಆದ್ಯತೆಯ ಜಮೀನಿನ ಪ್ರಕಾರ' : 'Preferred Land Type'} *</span>
                          </label>
                          <select
                            value={buyForm.landType || 'Residential Plot'}
                            onChange={(e) => setBuyForm({ ...buyForm, landType: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="Residential Plot">{isKn ? 'ವಸತಿ ನಿವೇಶನ (ಫ್ಲಾಟ್/ಲೇಔಟ್)' : 'Residential Plot (Flat/Layout)'}</option>
                            <option value="Apartment Land">{isKn ? 'ಅಪಾರ್ಟ್‌ಮೆಂಟ್/ಫ್ಲಾಟ್ ಜಮೀನು' : 'Apartment/Flat Development Land'}</option>
                            <option value="Commercial Land">{isKn ? 'ವಾಣಿಜ್ಯ ಜಮೀನು' : 'Commercial Land'}</option>
                            <option value="Agricultural Land">{isKn ? 'ಕೃಷಿ ಭೂಮಿ' : 'Agricultural Land / Acreage'}</option>
                            <option value="Villa Plot">{isKn ? 'ವಿಲ್ಲಾ ನಿವೇಶನ' : 'Villa Plot'}</option>
                          </select>
                        </div>

                        {/* Purpose */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                            <span>🎯 {isKn ? 'ಖರೀದಿಯ ಉದ್ದೇಶ' : 'Purchase Purpose'}</span>
                          </label>
                          <select
                            value={buyForm.purpose}
                            onChange={(e) => setBuyForm({ ...buyForm, purpose: e.target.value })}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="Residential Construction">Residential House Construction</option>
                            <option value="Commercial Development">Commercial Offices / Showrooms</option>
                            <option value="Gated Plot Investment">Long-term Plot Investment</option>
                            <option value="Farm Land / Agriculture">Agricultural Farming / Farmhouse</option>
                            <option value="Industrial Use">Factory / Warehouse Layout</option>
                          </select>
                        </div>

                      </div>

                      {/* Additional info */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-mono flex items-center space-x-1.5">
                          <span>📝 {isKn ? 'ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಬೇಡಿಕೆಗಳು' : 'Any Specific Requirements / Amenities Needed'}</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder={isKn ? 'ರಸ್ತೆ ಅಗಲ, ಗೇಟೆಡ್ ಕಮ್ಯುನಿಟಿ, ಅಥವಾ ಇನ್ಯಾವುದೇ ಆದ್ಯತೆಗಳು...' : 'e.g. Gated community layout, 40-ft wide approach road, nearby metro, east-facing priority, immediate registry.'}
                          value={buyForm.additionalInfo}
                          onChange={(e) => setBuyForm({ ...buyForm, additionalInfo: e.target.value })}
                          className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                        ></textarea>
                      </div>

                      <div className="pt-2 text-right">
                        <button
                          type="submit"
                          disabled={buySubmitting}
                          className="px-8 py-4 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black font-mono text-xs uppercase tracking-wider rounded-xl inline-flex items-center space-x-2 cursor-pointer shadow-lg shadow-amber-400/10"
                        >
                          {buySubmitting ? (
                            <span>{isKn ? 'ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...' : 'Registering...'}</span>
                          ) : (
                            <>
                              <span>{isKn ? 'ಖರೀದಿ ಬೇಡಿಕೆ ಸಲ್ಲಿಸಿ' : 'Submit Buy Requirements'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </form>

                    {/* Right: Beautiful Photo and Animated Process Tracker */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6">
                        
                        {/* Image Box */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
                          <img 
                            src={buyLandIllustration} 
                            alt="Bangalore site plan blueprint" 
                            className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider font-mono shadow-md">
                            {isKn ? 'ಬೇಡಿಕೆ ಪರಿಶೀಲನೆ' : 'MAPPING SYSTEM'}
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <span className="text-[10px] text-amber-400 block font-mono font-bold uppercase tracking-wider">
                              {isKn ? 'ನಿಖರವಾದ ಶೋಧನೆ' : 'Targeted Sourcing'}
                            </span>
                            <span className="text-xs text-white font-bold block">
                              {isKn ? 'ನಿಮ್ಮ ಬಜೆಟ್‌ಗೆ ತಕ್ಕ ಸುರಕ್ಷಿತ ಆಸ್ತಿಗಳು' : 'Vetted Plots Matching Your Budget'}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Steps Animation */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase font-mono text-slate-300 tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>{isKn ? 'ಖರೀದಿದಾರರಿಗೆ ನಮ್ಮ ವಿಶೇಷ ಸೇವೆ' : 'How We Fulfill Your Demands'}</span>
                          </h4>

                          <div className="space-y-4">
                            
                            {/* Step 1 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white uppercase tracking-wide">
                                  {isKn ? '೧. ಬೇಡಿಕೆ ಆಧಾರಿತ ಪ್ರದೇಶ ಶೋಧನೆ' : '1. Locality Vetting & Sourcing'}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ನೀವು ಬಯಸುವ ಪ್ರದೇಶಗಳ ಎಲ್ಲಾ ಕ್ರಿಯಾಶೀಲ ಜಮೀನು ಮಾಲೀಕರ ವಿವರಗಳನ್ನು ನಮ್ಮ ಫೈರ್‌ಸ್ಟೋರ್ ರಿಜಿಸ್ಟರ್‌ನಲ್ಲಿ ಶೋಧಿಸಲಾಗುತ್ತದೆ.'
                                    : 'Cross-reference your preferred localities with our database of pre-verified landowners.'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 animate-pulse" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white uppercase tracking-wide">
                                  {isKn ? '೨. ಖಾತಾ ಪ್ರಕಾರದ ದೃಢೀಕರಣ' : '2. Preferred Khata Inspection'}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ಎ-ಖಾತಾ ಅಥವಾ ಡಿ.ಸಿ. ಪರಿವರ್ತನೆ ವಿವರಗಳನ್ನು ಮೊದಲೇ ಪರಿಶೀಲಿಸಿ ನಿಮಗೆ ಸುರಕ್ಷಿತ ಆಸ್ತಿಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸುತ್ತೇವೆ.'
                                    : 'Ensure BBMP A-Khata, Panchayat E-Khata, or DC conversions meet strict compliance requirements.'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-amber-500/15 text-amber-400 rounded-lg shrink-0 mt-0.5">
                                <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                                  {isKn ? '೩. ಶೀರ್ಷಿಕೆ ಮತ್ತು ಕರಡು ಕಾಯ್ದೆ ಪರಿಶೀಲನೆ' : '3. Deep Title & EC Due Diligence'}
                                </h5>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ಯಾವುದೇ ಕೋರ್ಟ್ ವ್ಯಾಜ್ಯ ಅಥವಾ ಸಾಲಗಳಿಲ್ಲದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ೩೦ ವರ್ಷದ ಲಿಂಕ್ ದಸ್ತಾವೇಜುಗಳನ್ನು ಪರೀಕ್ಷಿಸುತ್ತೇವೆ.'
                                    : 'Perform rigorous title checks, encumbrance tracing, and layout sanity audits before showing the plot.'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Step 4 */}
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.7 }}
                              className="flex items-start space-x-3 text-left"
                            >
                              <div className="p-1.5 bg-slate-800 text-slate-400 rounded-lg shrink-0 mt-0.5">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                                  {isKn ? '೪. ನೇರ ಸಂವಹನ ಮತ್ತು ಖರೀದಿ ಮಾತುಕತೆ' : '4. Zero-Brokerage Matching'}
                                </h5>
                                <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                                  {isKn 
                                    ? 'ಖರೀದಿದಾರರು ಮತ್ತು ಮಾಲೀಕರಿಗೆ ನೇರ ಸಮಾಲೋಚನೆಗೆ ಆಸ್ಪದ ಕಲ್ಪಿಸಿ ಮುಕ್ತ ಮಾತುಕತೆಗೆ ನೆರವಾಗುತ್ತೇವೆ.'
                                    : 'Facilitate direct meetings with verified land owners with 100% pricing transparency and compliance.'}
                                </p>
                              </div>
                            </motion.div>

                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  ) : (
                    <div className="text-center py-12 max-w-lg mx-auto space-y-6">
                      <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2.5">
                        <h4 className="text-xl font-bold text-white">
                          {isKn ? 'ಖರೀದಿ ಬೇಡಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!' : 'Buy Requirements Logged!'}
                        </h4>
                        <p className="text-xs text-slate-400">
                          ID: <span className="font-mono text-amber-400 font-black">{buyRefId}</span>
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ನಿಮ್ಮ ಆಸ್ತಿ ಬೇಡಿಕೆಯನ್ನು ನಾವು ಫೈರ್‌ಸ್ಟೋರ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿಕೊಂಡಿದ್ದೇವೆ. ನಮ್ಮ ತಜ್ಞರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮಗೆ ತಕ್ಕ ಆಸ್ತಿಯನ್ನು ಹುಡುಕುತ್ತಾರೆ.'
                            : 'Your purchasing criteria are securely logged in our system. You can optionally alert our advisors on WhatsApp to review and matching plots in our catalog.'}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <button
                          onClick={resetBuyForm}
                          className="px-6 py-3 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 font-mono text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                        >
                          {isKn ? 'ಮತ್ತೊಂದು ಬೇಡಿಕೆ ಸಲ್ಲಿಸಿ' : 'Post Another'}
                        </button>

                        <a
                          href={getWhatsAppBuyerLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black font-mono text-xs uppercase tracking-wider rounded-xl inline-flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{isKn ? 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ' : 'Send via WhatsApp'}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 2.5: SMART MATCHUPS BOARD */}
              {activeTab === 'matchups' && (
                <motion.div
                  key="matchups-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Visual Friendly Header */}
                  <div className="border-b border-slate-800 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 mb-3">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                          <span>{isKn ? 'ಸ್ವಯಂಚಾಲಿತ ಸುಲಭ ಒಪ್ಪಂದಗಳು' : 'Direct & Spam-Free'}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-wider font-mono">
                          {isKn ? '🤝 ಜಮೀನು ಜೋಡಣೆ ಮಾರುಕಟ್ಟೆ' : '🤝 Direct Land Matchmaker'}
                        </h3>
                        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed mt-1">
                          {isKn 
                            ? 'ಜಮೀನು ಮಾರಾಟಗಾರರು ಮತ್ತು ನೇರ ಖರೀದಿದಾರರನ್ನು ನಾವು ಪಾರದರ್ಶಕವಾಗಿ ಜೋಡಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಸುರಕ್ಷಿತವಾಗಿದ್ದು, ಯಾವುದೇ ಅನಗತ್ಯ ಬ್ರೋಕರ್ ಕಾಲ್ಸ್ ಬರುವುದಿಲ್ಲ!'
                            : 'We instantly connect property owners with direct buyers. Your phone number is kept absolutely safe to protect you from unwanted agent spam!'
                          }
                        </p>
                      </div>

                      <button
                        onClick={fetchAllDataPublic}
                        className="px-5 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-white rounded-xl flex items-center justify-center space-x-2 shrink-0 cursor-pointer transition-colors"
                      >
                        <span className="animate-spin text-amber-400 h-3.5 w-3.5 border-2 border-amber-400 border-t-transparent rounded-full" style={{ animationDuration: '1.5s', display: loadingList ? 'inline-block' : 'none' }}></span>
                        {!loadingList && <span>🔄</span>}
                        <span>{isKn ? 'ಸಂಪರ್ಕಗಳನ್ನು ಮರುಪರಿಶೀಲಿಸಿ' : 'Refresh Matching List'}</span>
                      </button>
                    </div>
                  </div>

                  {/* HOW IT WORKS FOR NORMAL PEOPLE CARD SECTION */}
                  <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6 sm:p-8">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-mono mb-6 text-center">
                      ✨ {isKn ? 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?' : 'How does this help you?'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Step 1 */}
                      <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-850 space-y-3">
                        <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center text-amber-400 font-bold text-lg">
                          1
                        </div>
                        <div className="font-bold text-white text-sm">
                          {isKn ? 'ನಿಮ್ಮ ವಿವರ ಸಲ್ಲಿಸಿ' : '1. Post Your Need'}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ನಿಮ್ಮ ಜಮೀನು ಮಾರಲು "ಜಮೀನು ಮಾರಾಟ ಮಾಡಿ" ಫಾರ್ಮ್ ತುಂಬಿ, ಅಥವಾ ಖರೀದಿಸಲು "ಜಮೀನು ಖರೀದಿಸಿ" ಫಾರ್ಮ್ ತುಂಬಿ.'
                            : 'Simply register under "Register Land to Sell" or "Register Buy Requirements" with your budget and area.'
                          }
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-850 space-y-3">
                        <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center text-amber-400 font-bold text-lg">
                          2
                        </div>
                        <div className="font-bold text-white text-sm">
                          {isKn ? 'ಸ್ವಯಂಚಾಲಿತ ಜೋಡಣೆ' : '2. Instant Matching'}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ನಮ್ಮ ಸಿಸ್ಟಮ್ ನಿಮ್ಮ ಏರಿಯಾ, ಬಜೆಟ್ ಮತ್ತು ಜಮೀನಿನ ಪ್ರಕಾರಕ್ಕೆ ತಕ್ಕಂತೆ ಸರಿಯಾದ ಜೋಡಣೆಯನ್ನು ತಕ್ಷಣ ಹುಡುಕುತ್ತದೆ.'
                            : 'We instantly pair sellers and buyers who are looking in the same area for a similar price range.'
                          }
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-850 space-y-3">
                        <div className="w-10 h-10 bg-emerald-400/10 rounded-xl flex items-center justify-center text-emerald-400 font-bold text-lg">
                          3
                        </div>
                        <div className="font-bold text-white text-sm">
                          {isKn ? 'ಯಾವುದೇ ಬ್ರೋಕರ್ ಹಾವಳಿ ಇಲ್ಲ' : '3. Zero Spam Guarantee'}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ನಿಮ್ಮ ನಂಬರ್ ಯಾರಿಗೂ ತಿಳಿಯುವುದಿಲ್ಲ. MMB ರಿಯಾಲ್ಟರ್ಸ್ ನುರಿತ ತಜ್ಞರು ನಿಮ್ಮ ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ ಸುರಕ್ಷಿತವಾಗಿ ಜೋಡಣೆ ಮಾಡುತ್ತಾರೆ!'
                            : 'No agent calls or spam! We hide your contact info, verify title deeds, and introduce you only when it is a safe, perfect match.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Simple Stats Counter */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-slate-950/80 border border-slate-850 rounded-2xl flex items-center space-x-4">
                      <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isKn ? 'ಇಂದಿನ ಒಟ್ಟು ಹೊಂದಾಣಿಕೆಗಳು' : 'Matching Pairs Found'}</div>
                        <div className="text-lg font-black text-white mt-0.5">{filteredMatchups.length} {isKn ? 'ಜೋಡಿಗಳು' : 'Matches'}</div>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-950/80 border border-slate-850 rounded-2xl flex items-center space-x-4">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isKn ? 'ಖಾತರಿ ಜಮೀನುಗಳು' : 'Available Land Listings'}</div>
                        <div className="text-lg font-black text-white mt-0.5">{sellersList.length} {isKn ? 'ಆಸ್ತಿಗಳು' : 'Properties'}</div>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-950/80 border border-slate-850 rounded-2xl flex items-center space-x-4">
                      <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isKn ? 'ಸಿದ್ಧ ಖರೀದಿದಾರರು' : 'Active Home/Land Buyers'}</div>
                        <div className="text-lg font-black text-white mt-0.5">{buyersList.length} {isKn ? 'ಗ್ರಾಹಕರು' : 'Active Buyers'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/20 p-4 rounded-2xl border border-slate-850">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder={isKn ? 'ನಿಮ್ಮ ಪ್ರದೇಶ ನಮೂದಿಸಿ (ಉದಾಹರಣೆಗೆ: Whitefield, Devanahalli)...' : 'Type an area name (e.g. Devanahalli, Whitefield)...'}
                        value={matchupSearch}
                        onChange={(e) => setMatchupSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <select
                        value={matchupTypeFilter}
                        onChange={(e) => setMatchupTypeFilter(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="All">{isKn ? 'ಎಲ್ಲಾ ಜಮೀನು/ನಿವೇಶನ ವಿಧಗಳು' : 'All Property Types'}</option>
                        <option value="Residential Plot">{isKn ? 'ವಸತಿ ನಿವೇಶನ (Plot/Layout)' : 'Residential Plot (Flat/Layout)'}</option>
                        <option value="Apartment Land">{isKn ? 'ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ಜಮೀನು' : 'Apartment/Flat Development Land'}</option>
                        <option value="Commercial Land">{isKn ? 'ವಾಣಿಜ್ಯ ಜಮೀನು' : 'Commercial Land'}</option>
                        <option value="Agricultural Land">{isKn ? 'ಕೃಷಿ ಭೂಮಿ' : 'Agricultural Land / Acreage'}</option>
                        <option value="Villa Plot">{isKn ? 'ವಿಲ್ಲಾ ನಿವೇಶನ' : 'Villa Plot'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Matching Records */}
                  {loadingList && sellersList.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 font-mono text-xs">
                      <Clock className="w-8 h-8 mx-auto mb-3 text-amber-400 animate-spin" />
                      <span>{isKn ? 'ಹೊಂದಾಣಿಕೆಯಾಗುವ ಗ್ರಾಹಕರನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...' : 'Searching for direct matches in your location...'}</span>
                    </div>
                  ) : filteredMatchups.length === 0 ? (
                    <div className="text-center py-16 max-w-lg mx-auto bg-slate-950/40 border border-dashed border-slate-800 rounded-3xl p-8 space-y-4">
                      <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white uppercase font-mono">
                          {isKn ? 'ಯಾವುದೇ ಸಕ್ರಿಯ ಹೊಂದಾಣಿಕೆಗಳಿಲ್ಲ' : 'No Matches Found Yet'}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {isKn 
                            ? 'ಈ ಪ್ರದೇಶದಲ್ಲಿ ಅಥವಾ ಈ ಬಜೆಟ್‌ನಲ್ಲಿ ಸದ್ಯಕ್ಕೆ ಹೊಂದಾಣಿಕೆಯಾಗುವ ಆಸ್ತಿ ಸಿಕ್ಕಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಬಡಾವಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ನಿಮ್ಮ ವಿವರಗಳನ್ನು "ಜಮೀನು ಮಾರಾಟ ಮಾಡಿ" ಮೂಲಕ ನೋಂದಾಯಿಸಿ.'
                            : 'No seller properties align with active buyer requirements for this area. Register your plot or requirement to let the system link you automatically!'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-8">
                      {filteredMatchups.map((match) => {
                        // User-friendly badge descriptions
                        let matchBadgeText = isKn ? '✨ ಪರಿಪೂರ್ಣ ಜೋಡಿ!' : '✨ Excellent Match!';
                        let matchBadgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                        
                        if (match.score < 95 && match.score >= 85) {
                          matchBadgeText = isKn ? '👍 ಉತ್ತಮ ಜೋಡಿ!' : '👍 Great Match!';
                          matchBadgeStyle = 'bg-amber-400/10 text-amber-400 border-amber-400/20';
                        } else if (match.score < 85) {
                          matchBadgeText = isKn ? '🎯 ಸೂಕ್ತ ಜೋಡಿ' : '🎯 Good Match';
                          matchBadgeStyle = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                        }

                        // Encryption helper for client safety
                        const formatName = (name: string) => {
                          if (isAdminUnlocked) return name;
                          const trimmed = (name || '').trim();
                          if (trimmed.length <= 3) return `${trimmed}***`;
                          return `${trimmed.substring(0, 3)}***`;
                        };

                        return (
                          <div 
                            key={match.id} 
                            className="bg-slate-950/95 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all shadow-xl flex flex-col"
                          >
                            {/* Card Header with friendly badge */}
                            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-850 flex items-center justify-between flex-wrap gap-2.5">
                              <div className="flex items-center space-x-2.5">
                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${matchBadgeStyle}`}>
                                  {matchBadgeText}
                                </span>
                                <span className="text-[11px] text-slate-400 font-mono">
                                  🏢 {match.matchedLandType}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                                <MapPin className="w-4 h-4 text-amber-400" />
                                <span>{isKn ? 'ಬಡಾವಣೆ / ಏರಿಯಾ:' : 'Matched Area:'} <strong className="text-white font-mono">{match.matchedLocality}</strong></span>
                              </div>
                            </div>

                            {/* Two Column Layout (Owner Property vs Buyer Requirement) */}
                            <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                              
                              {/* SELLER COLUMN */}
                              <div className="md:col-span-5 bg-slate-900/20 p-4.5 rounded-2xl border border-slate-850 space-y-3.5 flex flex-col justify-between">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-black text-amber-400 font-mono uppercase tracking-wider">
                                      🏡 {isKn ? 'ಮಾಲೀಕರ ವಿವರ' : 'Seller\'s Plot'}
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                      {isKn ? 'ಮಾಲೀಕರು:' : 'Landowner:'} <strong className="text-slate-300">{formatName(match.seller.ownerName)}</strong>
                                    </span>
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಸ್ಥಳ (Locality):' : 'Where is it:'}</span>
                                      <span className="font-semibold text-white">{match.seller.locality}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಜಮೀನಿನ ಅಳತೆ (Size):' : 'Plot Size:'}</span>
                                      <span className="font-bold text-slate-300 font-mono">{match.seller.landSize?.toLocaleString()} Sq.Ft.</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ದಿಕ್ಕು (Facing):' : 'Facing:'}</span>
                                      <span className="text-slate-300 font-mono">{match.seller.facing || 'East'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಖಾತಾ ಪತ್ರ:' : 'Documents / Khata:'}</span>
                                      <span className="font-semibold text-slate-300">{match.seller.khataType || 'A Khata'}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                      <span className="text-slate-500">{isKn ? 'ಅಪೇಕ್ಷಿತ ಬೆಲೆ:' : 'Expected Price:'}</span>
                                      <span className="font-black text-amber-400 font-mono text-sm">{formatPriceToINR(String(match.seller.expectedPrice))}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* VISUAL CONNECTOR BRIDGE */}
                              <div className="md:col-span-2 flex flex-col items-center justify-center py-4 md:py-0 text-center space-y-2">
                                <div className="h-full w-px bg-slate-800 hidden md:block"></div>
                                <div className="p-3 bg-slate-900 border border-slate-800 rounded-full text-amber-400 shrink-0">
                                  <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">
                                  {isKn ? 'ನೇರ ಒಪ್ಪಂದ' : 'DIRECT LINK'}
                                </span>
                                <div className="h-full w-px bg-slate-800 hidden md:block"></div>
                              </div>

                              {/* BUYER COLUMN */}
                              <div className="md:col-span-5 bg-slate-900/20 p-4.5 rounded-2xl border border-slate-850 space-y-3.5 flex flex-col justify-between">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-black text-indigo-400 font-mono uppercase tracking-wider">
                                      🎯 {isKn ? 'ಖರೀದಿದಾರರ ಬೇಡಿಕೆ' : 'Buyer\'s Search'}
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                      {isKn ? 'ಖರೀದಿದಾರರು:' : 'Buyer:'} <strong className="text-slate-300">{formatName(match.buyer.buyerName)}</strong>
                                    </span>
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಬಯಸಿದ ಪ್ರದೇಶಗಳು:' : 'Desired Locations:'}</span>
                                      <span className="font-semibold text-white max-w-[150px] truncate" title={match.buyer.preferredLocalities}>{match.buyer.preferredLocalities}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಕನಿಷ್ಠ ಅಳತೆ:' : 'Min Size Required:'}</span>
                                      <span className="font-bold text-slate-300 font-mono">{match.buyer.minSize?.toLocaleString()} Sq.Ft.</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಖಾತ ಆದ್ಯತೆ:' : 'Document Preference:'}</span>
                                      <span className="text-slate-300 font-semibold">{match.buyer.preferredKhata || 'A Khata Only'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-850/50 pb-2">
                                      <span className="text-slate-500">{isKn ? 'ಉದ್ದೇಶ (Purpose):' : 'Purpose:'}</span>
                                      <span className="font-semibold text-slate-300 max-w-[140px] truncate">{match.buyer.purpose || 'Residential'}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                      <span className="text-slate-500">{isKn ? 'ಗರಿಷ್ಠ ಬಜೆಟ್:' : 'Max Budget:'}</span>
                                      <span className="font-black text-emerald-400 font-mono text-sm">{formatPriceToINR(String(match.buyer.maxBudget))}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {/* Contact Lock/Unlock Status panel */}
                            <div className="px-5 py-4 bg-slate-900/50 border-t border-slate-850">
                              {!isAdminUnlocked ? (
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                  <div className="flex items-center space-x-3 text-slate-400 text-xs">
                                    <div className="p-2 bg-amber-400/10 text-amber-500 rounded-lg shrink-0">
                                      <Lock className="w-4 h-4 animate-pulse" />
                                    </div>
                                    <span className="text-xs leading-relaxed text-slate-400">
                                      {isKn 
                                        ? '🔒 ಸುರಕ್ಷತೆಯ ದೃಷ್ಟಿಯಿಂದ ನಂಬರ್‌ಗಳನ್ನು ಮರೆಮಾಡಲಾಗಿದೆ. ಇಬ್ಬರನ್ನೂ ಸುರಕ್ಷಿತವಾಗಿ ಜೋಡಿಸಲು ನಮಗೆ ತಿಳಿಸಿ.'
                                        : '🔒 Contact details are encrypted for privacy. Click below to request our MMB Advisors to link both parties securely.'}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => {
                                      setActiveTab('admin');
                                      window.scrollTo({ top: 300, behavior: 'smooth' });
                                    }}
                                    className="px-4.5 py-2.5 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-400 font-bold font-mono text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-colors shrink-0"
                                  >
                                    🔑 {isKn ? 'ಅಡ್ಮಿನ್ ಪಾಸ್‌ಕೋಡ್ ನಮೂದಿಸಿ' : 'Unlock Direct Numbers'}
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold font-mono">
                                    <Unlock className="w-4 h-4 shrink-0" />
                                    <span>CONTACT DETAILS DISCLOSED</span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                                    {/* Seller Contact */}
                                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
                                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Seller Contact Info:</div>
                                      <div className="space-y-1">
                                        <div className="text-white font-bold">{match.seller.ownerName}</div>
                                        <div className="text-amber-400 font-semibold">{match.seller.phone}</div>
                                        {match.seller.email && <div className="text-slate-400 text-[11px] truncate">{match.seller.email}</div>}
                                      </div>
                                      <div className="flex gap-2 pt-1">
                                        <a
                                          href={`tel:${match.seller.phone}`}
                                          className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-center rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1"
                                        >
                                          <Phone className="w-3 h-3" />
                                          <span>Call Seller</span>
                                        </a>
                                        <a
                                          href={`https://wa.me/91${match.seller.phone}?text=${encodeURIComponent(`Hello ${match.seller.ownerName}, we have a matching buyer for your land in ${match.matchedLocality}. Size: ${match.seller.landSize} SqFt. Let's discuss!`)}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/20 rounded-lg"
                                          title="WhatsApp Chat"
                                        >
                                          <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
                                      </div>
                                    </div>

                                    {/* Buyer Contact */}
                                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
                                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Buyer Contact Info:</div>
                                      <div className="space-y-1">
                                        <div className="text-white font-bold">{match.buyer.buyerName}</div>
                                        <div className="text-amber-400 font-semibold">{match.buyer.phone}</div>
                                        {match.buyer.email && <div className="text-slate-400 text-[11px] truncate">{match.buyer.email}</div>}
                                      </div>
                                      <div className="flex gap-2 pt-1">
                                        <a
                                          href={`tel:${match.buyer.phone}`}
                                          className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-center rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1"
                                        >
                                          <Phone className="w-3 h-3" />
                                          <span>Call Buyer</span>
                                        </a>
                                        <a
                                          href={`https://wa.me/91${match.buyer.phone}?text=${encodeURIComponent(`Hello ${match.buyer.buyerName}, we found a verified plot in ${match.matchedLocality} matching your budget of ${formatPriceToINR(String(match.buyer.maxBudget))}. Let's discuss!`)}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/20 rounded-lg"
                                          title="WhatsApp Chat"
                                        >
                                          <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Direct WhatsApp Group Deal Bridger Link */}
                                  <a
                                    href={`https://wa.me/916366310992?text=${encodeURIComponent(`🏢 *MATCH BRIDGE INITIATED*\n\n📍 *Locality:* ${match.matchedLocality}\n🏢 *Land Type:* ${match.matchedLandType}\n\n👤 *Seller:* ${match.seller.ownerName} (${match.seller.phone})\n💰 *Asking:* ${formatPriceToINR(String(match.seller.expectedPrice))}\n\n👤 *Buyer:* ${match.buyer.buyerName} (${match.buyer.phone})\n💰 *Budget:* ${formatPriceToINR(String(match.buyer.maxBudget))}\n\nLet's bridge this transaction immediately.`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black font-mono text-[10px] uppercase tracking-wider text-center rounded-xl flex items-center justify-center space-x-1.5"
                                  >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Bridge Deal via MMB Realtors Support Group</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 3: SECURED AGENCY LISTINGS DESK */}
              {activeTab === 'admin' && (
                <motion.div
                  key="admin-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {!isAdminUnlocked ? (
                    <form onSubmit={handleUnlockAdmin} className="max-w-md mx-auto py-8 text-center space-y-6">
                      <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
                        <Database className="w-6 h-6 animate-pulse" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                          {isKn ? 'ಖಾಸಗಿ ಏಜೆನ್ಸಿ ಪ್ರವೇಶ' : 'Secure Agent Verification'}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {isKn 
                            ? 'ನೋಂದಾಯಿತ ಗ್ರಾಹಕರ ವೈಯಕ್ತಿಕ ಫೋನ್ ನಂಬರ್ ಮತ್ತು ಇಮೇಲ್ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ಏಜೆನ್ಸಿ ಪಾಸ್‌ಕೋಡ್ ಅಗತ್ಯವಿದೆ.'
                            : 'This is the control panel to directly fetch and retrieve registered seller land assets and buyer demands. Enter your passcode below.'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="password"
                            placeholder={isKn ? 'ಪಾಸ್‌ಕೋಡ್ ನಮೂದಿಸಿ (MMB2026)' : 'Enter Passcode (MMB2026)'}
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            className="w-full px-4.5 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400 transition-colors font-mono tracking-widest"
                          />
                        </div>
                        
                        {passcodeError && (
                          <p className="text-xs text-rose-400 font-mono">
                            ⚠️ {isKn ? 'ತಪ್ಪಾದ ಪಾಸ್‌ಕೋಡ್! ದಯವಿಟ್ಟು "MMB2026" ಅಥವಾ "1234" ಬಳಸಿ.' : 'Invalid passcode! Try "MMB2026" or "1234".'}
                          </p>
                        )}

                        <p className="text-[10px] text-slate-500 font-mono italic">
                          💡 Hint: Enter <span className="text-amber-400 font-bold">MMB2026</span> to unlock the database dashboard.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black font-mono text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        {isKn ? 'ಡೇಟಾಬೇಸ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ' : 'Authenticate & Fetch'}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Active Admin Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                        <div className="flex items-center space-x-3">
                          <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-white font-mono">
                              {isKn ? 'ಏಜೆನ್ಸಿ ರಿಯಲ್-ಟೈಮ್ ಕಂಟ್ರೋಲ್ ಡೆಸ್ಕ್' : 'Real-time Registration Control'}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {isKn ? 'ಒಟ್ಟು ನೋಂದಣಿಗಳು:' : 'Total Active database sync:'} {sellersList.length} Sellers | {buyersList.length} Buyers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={fetchAdminData}
                            className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-bold font-mono text-slate-400 hover:text-white cursor-pointer"
                          >
                            🔄 {isKn ? 'ತಾಜಾ ಮಾಡಿ' : 'Reload'}
                          </button>

                          <button
                            onClick={handleLockAdmin}
                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold font-mono cursor-pointer"
                          >
                            🔒 {isKn ? 'ಲಾಕ್ ಮಾಡಿ' : 'Lock Desk'}
                          </button>
                        </div>
                      </div>

                      {/* Filter panel */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            placeholder={isKn ? 'ಹೆಸರು, ಪ್ರದೇಶ ಅಥವಾ ಫೋನ್ ಮೂಲಕ ಹುಡುಕಿ...' : 'Search by name, location, phone...'}
                            value={adminSearch}
                            onChange={(e) => setAdminSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>

                        <div>
                          <select
                            value={adminLocalityFilter}
                            onChange={(e) => setAdminLocalityFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="All">{isKn ? 'ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು' : 'All Localities'}</option>
                            {bangaloreLocalities.map((loc, idx) => (
                              <option key={idx} value={loc}>{loc}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadCSV('sellers')}
                            disabled={filteredSellers.length === 0}
                            className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಮಾರಾಟಗಾರರ CSV' : 'Sellers CSV'}</span>
                          </button>
                          
                          <button
                            onClick={() => downloadCSV('buyers')}
                            disabled={filteredBuyers.length === 0}
                            className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isKn ? 'ಖರೀದಿದಾರರ CSV' : 'Buyers CSV'}</span>
                          </button>
                        </div>
                      </div>

                      {loadingList ? (
                        <div className="text-center py-12 text-slate-500 font-mono text-xs">
                          <Clock className="w-6 h-6 mx-auto mb-2 text-amber-400 animate-spin" />
                          <span>{isKn ? 'ಫೈರ್‌ಸ್ಟೋರ್ ಡೇಟಾಬೇಸ್‌ನಿಂದ ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Fetching live cloud registers...'}</span>
                        </div>
                      ) : listError ? (
                        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center space-x-2.5 text-rose-400 text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{listError}</span>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          
                          {/* Sellers Listings section */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-xs font-black uppercase text-amber-400 tracking-wider font-mono flex items-center space-x-2">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>{isKn ? 'ಖರೀದಿಗೆ ಲಭ್ಯವಿರುವ ಜಮೀನುಗಳು' : 'Registered Lands to Sell'} ({filteredSellers.length})</span>
                              </h5>
                            </div>

                            {filteredSellers.length === 0 ? (
                              <p className="text-xs text-slate-500 font-mono bg-slate-950/40 p-6 rounded-2xl border border-dashed border-slate-800 text-center">
                                {isKn ? 'ಯಾವುದೇ ಮಾರಾಟಗಾರರ ಆಸ್ತಿ ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ.' : 'No registered land sellers found matching filters.'}
                              </p>
                            ) : (
                              <div className="overflow-x-auto rounded-2xl border border-slate-850">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
                                      <th className="p-4">Owner Name</th>
                                      <th className="p-4">Locality</th>
                                      <th className="p-4">Size (SqFt)</th>
                                      <th className="p-4">Facing</th>
                                      <th className="p-4">Expected Price</th>
                                      <th className="p-4">Khata / Survey No</th>
                                      <th className="p-4 text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-850">
                                    {filteredSellers.map((item, idx) => (
                                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                                        <td className="p-4 font-bold text-white">
                                          <div>{item.ownerName}</div>
                                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.phone}</div>
                                        </td>
                                        <td className="p-4 text-slate-300">{item.locality}</td>
                                        <td className="p-4 text-slate-300 font-mono font-medium">{item.landSize?.toLocaleString()}</td>
                                        <td className="p-4 text-slate-400">{item.facing || 'N/A'}</td>
                                        <td className="p-4 text-amber-400 font-bold font-mono">
                                          {formatPriceToINR(String(item.expectedPrice))}
                                        </td>
                                        <td className="p-4">
                                          <div className="text-slate-300 font-mono font-semibold">{item.khataType}</div>
                                          <div className="text-[10px] text-slate-500 mt-0.5">Sy: {item.surveyNumber || 'N/A'}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                          <div className="flex items-center justify-end space-x-2">
                                            <a
                                              href={`tel:${item.phone}`}
                                              className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg hover:border-amber-400/40 text-slate-400 hover:text-amber-400"
                                              title="Call Owner"
                                            >
                                              <Phone className="w-3.5 h-3.5" />
                                            </a>
                                            <a
                                              href={`https://wa.me/91${item.phone}`}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/20"
                                              title="Chat via WhatsApp"
                                            >
                                              <ArrowUpRight className="w-3.5 h-3.5" />
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>

                          {/* Buyers Requirements section */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-xs font-black uppercase text-amber-400 tracking-wider font-mono flex items-center space-x-2">
                                <Layers className="w-3.5 h-3.5" />
                                <span>{isKn ? 'ಖರೀದಿಗೆ ಆಸಕ್ತಿ ಉಳ್ಳ ಗ್ರಾಹಕರು' : 'Logged Purchase Requirements'} ({filteredBuyers.length})</span>
                              </h5>
                            </div>

                            {filteredBuyers.length === 0 ? (
                              <p className="text-xs text-slate-500 font-mono bg-slate-950/40 p-6 rounded-2xl border border-dashed border-slate-800 text-center">
                                {isKn ? 'ಯಾವುದೇ ಖರೀದಿದಾರರ ಬೇಡಿಕೆ ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ.' : 'No registered buy requests found matching filters.'}
                              </p>
                            ) : (
                              <div className="overflow-x-auto rounded-2xl border border-slate-850">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
                                      <th className="p-4">Buyer Name</th>
                                      <th className="p-4">Preferred Localities</th>
                                      <th className="p-4">Min SqFt Required</th>
                                      <th className="p-4">Max Budget</th>
                                      <th className="p-4">Desired Khata / Purpose</th>
                                      <th className="p-4 text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-850">
                                    {filteredBuyers.map((item, idx) => (
                                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                                        <td className="p-4 font-bold text-white">
                                          <div>{item.buyerName}</div>
                                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.phone}</div>
                                        </td>
                                        <td className="p-4 text-slate-300 max-w-[180px] truncate" title={item.preferredLocalities}>
                                          {item.preferredLocalities}
                                        </td>
                                        <td className="p-4 text-slate-300 font-mono font-medium">{item.minSize?.toLocaleString()}</td>
                                        <td className="p-4 text-amber-400 font-bold font-mono">
                                          {formatPriceToINR(String(item.maxBudget))}
                                        </td>
                                        <td className="p-4">
                                          <div className="text-slate-300 font-mono font-semibold">{item.preferredKhata}</div>
                                          <div className="text-[10px] text-slate-500 mt-0.5">{item.purpose}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                          <div className="flex items-center justify-end space-x-2">
                                            <a
                                              href={`tel:${item.phone}`}
                                              className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg hover:border-amber-400/40 text-slate-400 hover:text-amber-400"
                                              title="Call Buyer"
                                            >
                                              <Phone className="w-3.5 h-3.5" />
                                            </a>
                                            <a
                                              href={`https://wa.me/91${item.phone}`}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/20"
                                              title="Chat via WhatsApp"
                                            >
                                              <ArrowUpRight className="w-3.5 h-3.5" />
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>

                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
