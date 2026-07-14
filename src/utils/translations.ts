export interface ServiceTranslation {
  name: string;
  desc: string;
  badge: string;
}

export interface ChecklistItemTranslation {
  name: string;
  badge: string;
  description: string;
}

export interface TranslationSchema {
  nav: {
    services: string;
    calculator: string;
    checklist: string;
    tracker: string;
    faq: string;
    landHub: string;
    schedule: string;
    phone: string;
    logoSubtitle: string;
    offices: string;
    authPaperwork: string;
    selectLanguage: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Label: string;
    stat1Val: string;
    stat2Label: string;
    stat2Val: string;
    stat3Label: string;
    stat3Val: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    shownOf: string;
    resetFilters: string;
    requestBtn: string;
    advocateBadge: string;
    advocateTitle: string;
    advocateDesc: string;
    advocatePoint1: string;
    advocatePoint2: string;
    advocatePoint3: string;
    advocatePoint4: string;
    pricingTitle: string;
    pricingDesc: string;
    categories: {
      all: string;
      khata: string;
      tax: string;
      deeds: string;
      land: string;
      approvals: string;
      search: string;
    };
    items: Record<string, ServiceTranslation>;
  };
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    configureTitle: string;
    configureDesc: string;
    guidanceLabel: string;
    lakhs: string;
    crores: string;
    categoryLabel: string;
    categories: {
      apartment: string;
      independent: string;
      plot: string;
      villa: string;
    };
    locationLabel: string;
    locations: {
      bbmp: { label: string; desc: string };
      bda_bmrda: { label: string; desc: string };
      panchayat_rural: { label: string; desc: string };
    };
    guidanceRuleTitle: string;
    guidanceRuleDesc: string;
    kaveriCostHeader: string;
    estimateTitle: string;
    totalEstimatedCost: string;
    govFees: string;
    serviceFees: string;
    baseStampDuty: string;
    infraCess: string;
    urbanSurcharge: string;
    registrationCharge: string;
    flatLegalFee: string;
    disclaimer: string;
    ctaButton: string;
    escrowTitle: string;
    escrowDesc: string;
  };
  checklist: {
    badge: string;
    title: string;
    subtitle: string;
    tabs: {
      resale: { label: string; desc: string };
      builder: { label: string; desc: string };
      plot: { label: string; desc: string };
      gift: { label: string; desc: string };
    };
    preparednessScore: string;
    prepared: string;
    of: string;
    requiredBadge: string;
    optionalBadge: string;
    missingTitle: string;
    missingDesc: string;
    missingBtn: string;
    items: Record<string, ChecklistItemTranslation>;
  };
  tracker: {
    badge: string;
    title: string;
    subtitle: string;
    enterCodeLabel: string;
    placeholder: string;
    checkStatusBtn: string;
    checkingRegisters: string;
    trySampleLabel: string;
    reference: string;
    registryNode: string;
    currentStatus: string;
    primaryApplicant: string;
    propertyLocation: string;
    workflowTitle: string;
    remarksLabel: string;
    sample1: string;
    sample2: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    legalNoteTitle: string;
    legalNoteDesc: string;
    items: Array<{ q: string; a: string }>;
  };
  booking: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formDesc: string;
    fieldFullName: string;
    fieldPhone: string;
    fieldEmail: string;
    fieldLocality: string;
    fieldPropertyType: string;
    fieldServiceType: string;
    fieldDate: string;
    fieldNotes: string;
    fieldNotesPlaceholder: string;
    submitting: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    refId: string;
    syncTitle: string;
    syncDesc: string;
    sendWhatsApp: string;
    callSupport: string;
    resetForm: string;
  };
  trust: {
    title: string;
    subtitle: string;
    badge: string;
    p1: string;
    p2: string;
    block1Title: string;
    block1Desc: string;
    block2Title: string;
    block2Desc: string;
  };
}

export const translations: Record<'en' | 'kn', TranslationSchema> = {
  en: {
    nav: {
      services: 'Our Services',
      calculator: 'Stamp Duty Calculator',
      checklist: 'Document Checklist',
      tracker: 'Track Application',
      faq: 'FAQs',
      landHub: 'Land Hub',
      schedule: 'Schedule Consultation',
      phone: '+91 63663 10992',
      logoSubtitle: 'Property Legal & Papers Office',
      offices: 'Offices: MG Road | Indiranagar | Jayanagar',
      authPaperwork: 'Govt Authorized Paperwork Assistance',
      selectLanguage: 'Language / ಭಾಷೆ'
    },
    hero: {
      badge: 'Government Liaisoning & Registration Desk',
      title: 'Bangalore Property Legal & Paperwork',
      titleAccent: 'Assistance Specialists',
      subtitle: 'Official e-Khata registrations, title deeds tracing, Kaveri 2.0 sub-registrar coordination, and professional stamp duty compliance for secure real estate ownership.',
      ctaPrimary: 'Check Required Documents',
      ctaSecondary: 'Calculate Registration Costs',
      stat1Label: 'Verified Title Audits',
      stat1Val: '1,200+',
      stat2Label: 'SRO Executions Done',
      stat2Val: '100%',
      stat3Label: 'Kaveri Registrars',
      stat3Val: 'All 44'
    },
    services: {
      badge: 'Our Service Portfolio',
      title: 'Comprehensive Property Assistance Services',
      subtitle: 'We offer expert legal coordination and document processing for exactly 24 essential real estate services in Bangalore. Choose your service category below to get started.',
      searchPlaceholder: 'Search across all 24 services...',
      shownOf: 'of 24 Services Shown',
      resetFilters: 'Reset Filters',
      requestBtn: 'Request Now',
      advocateBadge: 'Advocate Network & Consultations',
      advocateTitle: 'Comprehensive Legal Services are Available',
      advocateDesc: 'In addition to our core document tracking and procurement catalog, complete legal drafting, vetting, and professional litigation-free title verification are fully available. We coordinate directly with senior property lawyers in Bangalore to protect your investments.',
      advocatePoint1: 'Property Title Verification & Legal Opinions',
      advocatePoint2: 'Drafting & Vetting Sale Deeds & Agreements',
      advocatePoint3: 'Joint Development Agreements (JDA) Legal Audit',
      advocatePoint4: 'Gift Deeds, Partition Deeds & Will Registration',
      pricingTitle: 'Customized Pricing Discussed Directly',
      pricingDesc: 'All service pricing and processing logistics are discussed directly with you depending on your specific requirements. We maintain complete transparency with absolutely zero commission-based structures, hidden broker margins, or unexpected surcharges.',
      categories: {
        all: 'All Services',
        khata: 'Khata Services',
        tax: 'Property Tax',
        deeds: 'Title Deeds & Copies',
        land: 'Land Records & Survey',
        approvals: 'Rentals & Properties',
        search: 'PID & Search'
      },
      items: {
        'e-Khata Registration': {
          name: 'e-Khata Registration',
          desc: 'Get your property newly registered in the digitized BBMP e-Khata system with a valid PID.',
          badge: 'Digital India'
        },
        'e-Khata Transfer': {
          name: 'e-Khata Transfer',
          desc: 'Official transfer of e-Khata from the seller to the buyer after property registration.',
          badge: 'Title Update'
        },
        'A Khata Assistance': {
          name: 'A Khata Assistance',
          desc: 'Verify and apply for A-Khata listing to secure high-value bank loans and building permits.',
          badge: 'Premium Title'
        },
        'B Khata Assistance': {
          name: 'B Khata Assistance',
          desc: 'Verify B-Khata registration, tax payment tracking, and assistance in understanding conversion rules.',
          badge: 'Compliance'
        },
        'Khata Extract': {
          name: 'Khata Extract',
          desc: 'Procure official certified Khata Extract detailing property dimensions, value, and taxation history.',
          badge: 'Verification'
        },
        'Khata Certificate': {
          name: 'Khata Certificate',
          desc: 'Retrieve certified Khata Certificate proving property registration under the municipal tax register.',
          badge: 'Official Proof'
        },
        'Property Tax Assessment': {
          name: 'Property Tax Assessment',
          desc: 'Calculate, structure, and submit property tax assessments to prevent legal penalties or arrears.',
          badge: 'Tax Computation'
        },
        'Property Tax Payment Assistance': {
          name: 'Property Tax Payment Assistance',
          desc: 'Secure digital payment of property tax online with clean receipt downloads and ledger clearance.',
          badge: 'Quick Clearance'
        },
        'Property Tax Name Transfer': {
          name: 'Property Tax Name Transfer',
          desc: 'Update ownership records in the property tax database after buying or inheriting a property.',
          badge: 'Owner Update'
        },
        'Encumbrance Certificate (EC)': {
          name: 'Encumbrance Certificate (EC)',
          desc: 'Obtain Form 15/16 Encumbrance Certificates to confirm there are no active mortgages or legal disputes.',
          badge: 'Clear History'
        },
        'Certified Copies of Sale Deed': {
          name: 'Certified Copies of Sale Deed',
          desc: 'Retrieve legally certified copies of your registered Sale Deed from the Kaveri sub-registrar vault.',
          badge: 'Legal Copy'
        },
        'Previous Title Documents': {
          name: 'Previous Title Documents',
          desc: 'Sourcing and audit of older title agreements, partition deeds, and settlement papers.',
          badge: 'Audit Help'
        },
        'Missing Property Document Retrieval': {
          name: 'Missing Property Document Retrieval',
          desc: 'Locate, trace, and extract lost, misplaced, or damaged property title deeds from government archives.',
          badge: 'Archive Search'
        },
        'RTC / Pahani': {
          name: 'RTC / Pahani',
          desc: 'Obtain the official Record of Rights, Tenancy and Crops (RTC) from the Bhoomi land records system.',
          badge: 'Bhoomi Record'
        },
        'Mutation Register Extract (MR)': {
          name: 'Mutation Register Extract (MR)',
          desc: 'Retrieve MR extracts confirming agricultural or converted land ownership changes.',
          badge: 'Revenue Record'
        },
        'Survey Sketch': {
          name: 'Survey Sketch',
          desc: 'Official 11E survey sketch showing exact geometric boundary lines and property coordinates.',
          badge: 'Land Boundary'
        },
        'Tippani': {
          name: 'Tippani',
          desc: 'Retrieve Tippani land records indicating physical survey maps and original partition lines.',
          badge: 'Survey Proof'
        },
        'Village Map': {
          name: 'Village Map',
          desc: 'Official village maps depicting surrounding property survey numbers and public roads/channels.',
          badge: 'Zoning Map'
        },
        'Akarband': {
          name: 'Akarband',
          desc: 'Retrieve official Akarband register copies showing land valuation, survey details, and tax rates.',
          badge: 'Register Copy'
        },
        'Rental Houses Assistance': {
          name: 'Find Rooms & Houses for Rent',
          desc: 'Looking for a room or house for rent? Contact us! We help you find and secure the perfect rental property.',
          badge: 'Rentals'
        },
        'Urban Property Land Services': {
          name: 'Urban Property Buy & Sell Matchmaking',
          desc: 'Are you selling or looking to buy urban property or plots? Contact us. We connect genuine buyers and sellers directly.',
          badge: 'Urban Match'
        },
        'Rural Property Land Services': {
          name: 'Rural Land Buy & Sell Matchmaking',
          desc: 'Are you selling or looking to buy agricultural land or rural property? Contact us. We seamlessly connect buyers and sellers.',
          badge: 'Rural Match'
        },
        'Property PID Search': {
          name: 'Property PID Search',
          desc: 'Locate and verify your property Unique Property Identification Number (PID) in BBMP records.',
          badge: 'PID ID'
        },
        'BBMP Property Details Search': {
          name: 'BBMP Property Details Search',
          desc: 'Complete background checks on registered property dimensions, zone classification, and status.',
          badge: 'BBMP Search'
        }
      }
    },
    calculator: {
      badge: 'Stamp Duty Estimator',
      title: 'Karnataka Stamp Duty & Registration Calculator',
      subtitle: 'Get an instant, legally accurate breakdown of your government registry charges and legal paper preparation fees according to the latest 2026 Bangalore guidelines.',
      configureTitle: 'Configure Property Details',
      configureDesc: 'Adjust property parameters to fetch real-time registry costs',
      guidanceLabel: 'Property / Guidance Value',
      lakhs: 'Lakhs',
      crores: 'Crores',
      categoryLabel: 'Property Category',
      categories: {
        apartment: 'Apartment/Flat',
        independent: 'Ind. House/Villa',
        plot: 'Vacant Plot/Land',
        villa: 'Luxury Villa'
      },
      locationLabel: 'Location Jurisdiction (Bangalore)',
      locations: {
        bbmp: { label: 'BBMP Urban Limits', desc: 'Central BLR (5.6% Stamp Duty)' },
        bda_bmrda: { label: 'BDA / BMRDA Area', desc: 'Outer Suburbs (5.65% Stamp Duty)' },
        panchayat_rural: { label: 'Gram Panchayat Limits', desc: 'Rural / Fringe (5.5% Stamp Duty)' }
      },
      guidanceRuleTitle: 'Guidance Value Rule:',
      guidanceRuleDesc: 'Stamp duty in Bengaluru is calculated on either the Government Guidance Value or the Actual Agreement Value—whichever is HIGHER. Registering below guidance value can lead to severe legal penalties.',
      kaveriCostHeader: 'kaveri 2.0 cost break-up',
      estimateTitle: 'Estimate Breakdown',
      totalEstimatedCost: 'Total Estimated Cost',
      govFees: 'Govt Fees',
      serviceFees: 'Service',
      baseStampDuty: 'Base Stamp Duty (5.0%)',
      infraCess: 'Infra & Library Cess (10% of SD)',
      urbanSurcharge: 'Urban Surcharge',
      registrationCharge: 'Registration Charge (1.0%)',
      flatLegalFee: 'Our Flat Legal Service Fee',
      disclaimer: '*Disclaimer: Govt fees are calculated using standard 2026 Kaveri 2.0 rates. Actual stamp duty might vary dynamically based on localized guidance values set by BBMP/BDA.',
      ctaButton: 'Confirm & Hire Agent For Registry',
      escrowTitle: '100% Escrow Protection',
      escrowDesc: 'Your stamp duty and registration fees are paid directly to the sub-registrar department through secure challan generation. We do not touch or hold any stamp duty funds.'
    },
    checklist: {
      badge: 'Interactive Audit Helper',
      title: 'Interactive Property Document Checklist',
      subtitle: 'Select your transaction category to see the legal papers required for sub-registrar validation in Bangalore. Tick off your prepared files to check your registry preparedness.',
      tabs: {
        resale: { label: 'Resale Apartment/House', desc: 'Individual Seller' },
        builder: { label: 'New Builder Flat', desc: 'Direct from Developer' },
        plot: { label: 'Vacant Plot/Land', desc: 'Layout/Plot Sale' },
        gift: { label: 'Gift/Settlement Deed', desc: 'Family Kin Transfers' }
      },
      preparednessScore: 'Document Preparedness Score',
      prepared: 'Prepared',
      of: 'of',
      requiredBadge: 'Strictly Required',
      optionalBadge: 'Optional / Conditional',
      missingTitle: 'Missing Some Papers?',
      missingDesc: 'If you do not have the Mother Deeds, up-to-date Encumbrance Certificate, or Khata, we can officially extract copies from the BBMP, Sakala, and Kaveri archives for you.',
      missingBtn: 'Get Paper Extraction Help',
      items: {
        b1: { name: 'Mother Deed / Parent Deeds', badge: 'Flow of Title', description: 'Traces the history of ownership. Extremely crucial in Bangalore to verify that the developer holds uncontested ownership of the land.' },
        b2: { name: 'Joint Development Agreement (JDA)', badge: 'Landowner Share', description: 'If built on shared land, shows the legal split of flats/revenue between the landowner and the developer.' },
        b3: { name: 'BBMP Building Plan Sanction', badge: 'Approved Layout', description: 'Approved blueprints by BBMP or BDA. Verifies that the construction does not violate building bylaws.' },
        b4: { name: 'K-RERA Registration Certificate', badge: 'RERA Compliance', description: 'Karnataka Real Estate Regulatory Authority certificate. Required for projects with >8 apartments.' },
        b5: { name: 'Occupancy Certificate (OC)', badge: 'Legality of Stay', description: 'Issued by BBMP when the building is completed according to plans. Vital for getting BESCOM power, BWSSB water, and bank home loans.' },
        b6: { name: 'Allotment Letter & Sale Agreement', badge: 'Proof of Purchase', description: 'Signed booking receipt and the bi-lateral contract specifying the payment schedule and flat details.' },
        b7: { name: 'NOC from BESCOM & BWSSB', badge: 'Utilities Clear', description: 'No Objection Certificate from Bangalore Electricity Supply Co. and Bangalore Water Supply and Sewerage Board.' },
        b8: { name: 'PAN & Aadhar Cards of Buyer', badge: 'ID Proof', description: 'Standard government-issued identities. Required for biometric registration matching.' },
        r1: { name: 'Primary Mother Deed', badge: 'Ownership History', description: 'Continuous title flow documents for at least the last 30 years to prove no gaps in ownership.' },
        r2: { name: 'Previous Registered Sale Deeds', badge: 'Current Title', description: 'The registered document showing how the current seller acquired the property from the previous owner.' },
        r3: { name: 'Up-to-Date Encumbrance Certificate (EC)', badge: 'Form 15', description: 'Form 15 issued from Kaveri sub-registrar portal proving no active mortgages or outstanding legal disputes on the property.' },
        r4: { name: 'BBMP A-Khata Certificate & Extract', badge: 'Tax Ledger', description: 'Proof that the property is registered under BBMP tax registers. Transfer requires current A-Khata Extract.' },
        r5: { name: 'Latest BBMP Property Tax Paid Receipts', badge: 'No Arrears', description: 'Current tax paid receipts. BBMP portals will lock transfer requests if taxes are pending even by ₹1.' },
        r6: { name: 'NOC from Apartment Owners Association', badge: 'Society NOC', description: 'Clears the buyer of any outstanding maintenance fees, and officially accepts them into the society registry.' },
        r7: { name: 'Original Building Plan Sanction & CC/OC', badge: 'Approved Status', description: 'Confirms that the property is built legitimately without major deviations.' },
        r8: { name: 'Witness ID Proofs & KYC', badge: 'Sub-Registrar', description: 'Aadhar and PAN cards of 2 witnesses who must physically accompany you to the sub-registrar office.' },
        p1: { name: 'Mother Deed / Parent Document', badge: 'Land Flow', description: 'Continuous record of historical ownership. Very important to track conversion history.' },
        p2: { name: 'Land Conversion Certificate (Akarband)', badge: 'DC Conversion', description: 'Issued by the Deputy Commissioner (DC) converting agricultural land to residential use.' },
        p3: { name: 'BDA/BMRDA/BIAPPA Layout Approval', badge: 'Approved Layout', description: 'Blueprint sanction from Bangalore planning bodies. Unsanctioned plots are highly vulnerable.' },
        p4: { name: 'Latest Khata Certificate & Extract', badge: 'E-Khata / BBMP', description: 'E-Khata (Gram Panchayat Form 9/11) or BBMP Khata proving legal taxation record.' },
        p5: { name: 'Nil Encumbrance Certificate (30 years)', badge: 'Clean History', description: 'Shows that the layout or plot has not been pledged to cooperative banks or private lenders.' },
        p6: { name: 'Layout Boundary Map & Survey Sketch', badge: 'Exact Demarcation', description: 'Officially drawn dimensions to verify that the physical plot matches the measurements written in the deed.' },
        g1: { name: 'Original Title / Acquisition Deed', badge: 'Donor Proof', description: 'Proof of how the donor (the person gifting) acquired the property in Bangalore.' },
        g2: { name: 'Current BBMP A-Khata Certificate', badge: 'Active Tax Record', description: 'Tax registration of the donor to facilitate smooth donor-to-donee transfer.' },
        g3: { name: 'Latest Property Tax Receipts', badge: 'Up-to-Date Taxes', description: 'All BBMP dues must be fully cleared prior to drafting a gift registry.' },
        g4: { name: 'Family Tree Certificate (Vamshavruksha)', badge: 'Kinship Proof', description: 'Government document proving close relationship. Vital because stamp duty on blood-relation gift deeds is capped at low flat rates (e.g. ₹5,000) instead of 5.1%.' }
      }
    },
    tracker: {
      badge: 'Kaveri 2.0 & BBMP Live Tracking',
      title: 'Track Your Property Registration Papers',
      subtitle: 'We believe in complete transparency. Enter your custom service reference code to check on your document drafting, BBMP liaisoning, or SRO appointment status.',
      enterCodeLabel: 'Enter Your Service Reference Tracking Code',
      placeholder: 'e.g. BLR-REG-3041 or BLR-KHA-8492',
      checkStatusBtn: 'Check Status',
      checkingRegisters: 'Checking Registers...',
      trySampleLabel: 'Try Sample Application Codes:',
      reference: 'Reference',
      registryNode: 'Kaveri Registry Node',
      currentStatus: 'Current Status',
      primaryApplicant: 'Primary Applicant',
      propertyLocation: 'Property Address Location',
      workflowTitle: 'Application Workflow Milestone',
      remarksLabel: '[Remarks]:',
      sample1: 'BLR-REG-3041 (Indiranagar Deed Registry)',
      sample2: 'BLR-KHA-8492 (Bellandur BBMP Khata)'
    },
    faq: {
      badge: 'FAQs',
      title: 'Common Bangalore Real Estate Inquiries',
      subtitle: 'Clear, authoritative legal answers addressing local property paper issues, municipal transfers, and Kaveri 2.0 compliance questions.',
      legalNoteTitle: 'Expert Legal Advice Available',
      legalNoteDesc: 'Need customized advice regarding complex land disputes, multiple-owner partition deeds, or Kaveri 2.0 valuation errors? Speak directly with an advocate from our partner Bangalore law panel.',
      items: [
        { q: 'What is the exact difference between A Khata and B Khata in Bangalore?', a: 'An A Khata is an active tax register entry for properties fully matching municipal building rules, holds approved BDA/BBMP blueprints, and is completely legal. A B Khata is a secondary record for properties with structural layout deviations or municipal rule violations. B Khata properties cannot acquire standard commercial home loans from national banks or get physical building approvals until officially converted.' },
        { q: 'What is Kaveri 2.0 and why is it mandatory for Bangalore registrations?', a: 'Kaveri 2.0 is the Karnataka government’s modern digital sub-registrar portal launched to speed up real estate transactions. It makes online pre-payment of stamp duties, digital booking of registration slots, and direct Aadhaar-based biometrics fully mandatory. It prevents fake impersonations and ensures the deed is officially logged in central Bangalore servers.' },
        { q: 'How is the Guidance Value of a Bangalore property determined?', a: 'The Guidance Value is the official minimum valuation rate set by the Government of Karnataka for different Bangalore streets and blocks. It is updated periodically and varies based on amenities (e.g., apartments with lifts have 10% higher guidance values than walk-ups). All stamp duties must be calculated on this guidance value or your actual sale value—whichever is higher.' },
        { q: 'Why is a continuous Mother Deed chain of 30 years strictly necessary?', a: 'A Mother Deed (Parent Deed) proves the legal ownership flow of a property prior to its current sale. In Bangalore, layouts are often converted from agricultural fields. Reviewing a 30-year continuous title chain is required by legal banks and SRO registrars to guarantee that no past family members, developers, or authorities hold an unrecognized claim on the property.' }
      ]
    },
    booking: {
      badge: 'Scheduling Callback Consultation',
      title: 'Book a Legal Paperwork Expert Callback',
      subtitle: 'Arrange a direct callback with our senior real estate team. We will review your property papers, calculate stamp duties, and map out your SRO registration file.',
      formTitle: 'Schedule Call',
      formDesc: 'Submit your property details to prompt an expert advisor call',
      fieldFullName: 'Your Full Name',
      fieldPhone: 'Phone/Mobile Number',
      fieldEmail: 'Email Address (Optional)',
      fieldLocality: 'Bangalore Locality / Ward',
      fieldPropertyType: 'Property Category',
      fieldServiceType: 'Service Required',
      fieldDate: 'Preferred Callback Date',
      fieldNotes: 'Tell us about your property papers (Optional)',
      fieldNotesPlaceholder: 'Mention if you have current Mother Deeds, e-Khata, or need fresh copies...',
      submitting: 'Securing Slot...',
      submitBtn: 'Schedule Consultation Call',
      successTitle: 'Consultation Scheduled!',
      successDesc: 'Your Bangalore real estate compliance advisor has been assigned to your file.',
      refId: 'Your Reference File ID',
      syncTitle: 'Direct Consultation Sync',
      syncDesc: 'Instantly share your details via WhatsApp or call our support line to discuss your title verification file:',
      sendWhatsApp: 'Send via WhatsApp',
      callSupport: 'Call +91 63663 10992',
      resetForm: 'Book Another Appointment'
    },
    trust: {
      title: 'Uncompromised Title Diligence',
      subtitle: 'Safeguarding Your Real Estate Capital',
      badge: 'Bangalore Property Due Diligence Desk',
      p1: 'Every property deal in Bangalore involves a massive financial commitment. Our mission is to shield your hard-earned capital from fraudulent title flows, unrecognized family claims, and unauthorized layouts. We perform exhaustive title searches to ensure your asset is 100% litigation-free.',
      p2: 'Through active liaisoning with municipal ward offices and sub-registrar chambers, we fast-track official certificate retrievals and e-Khata alignments with zero hassle.',
      block1Title: 'Comprehensive Title Audits',
      block1Desc: 'Exhaustive verification of 30+ years of Mother Deeds, Sale Agreements, and Encumbrance records.',
      block2Title: 'Municipal Liaison Desk',
      block2Desc: 'Direct, clean processing of BBMP e-Khata transfers, property tax updates, and Sakala filings.'
    }
  },
  kn: {
    nav: {
      services: 'ನಮ್ಮ ಸೇವೆಗಳು',
      calculator: 'ಮುದ್ರೆ ಶುಲ್ಕ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      checklist: 'ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
      tracker: 'ಅರ್ಜಿಯ ಸ್ಥಿತಿ',
      faq: 'ಪ್ರಶ್ನೋತ್ತರಗಳು',
      landHub: 'ಜಮೀನು ಹಬ್',
      schedule: 'ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ',
      phone: '+91 63663 10992',
      logoSubtitle: 'ಆಸ್ತಿ ಕಾನೂನು ಮತ್ತು ದಾಖಲೆಗಳ ಕಚೇರಿ',
      offices: 'ಕಚೇರಿಗಳು: ಎಂಜಿ ರಸ್ತೆ | ಇಂದಿರಾನಗರ | ಜಯನಗರ',
      authPaperwork: 'ಸರ್ಕಾರದ ಅಧಿಕೃತ ದಾಖಲೆಗಳ ಸಹಾಯ ಕೇಂದ್ರ',
      selectLanguage: 'ಭಾಷೆ / Language'
    },
    hero: {
      badge: 'ಸರ್ಕಾರಿ ಕಚೇರಿಗಳ ಸಮನ್ವಯ ಮತ್ತು ನೋಂದಣಿ ವಿಭಾಗ',
      title: 'ಬೆಂಗಳೂರು ಆಸ್ತಿ ಕಾನೂನು ಮತ್ತು ದಾಖಲಾತಿ',
      titleAccent: 'ಸಹಾಯ ತಜ್ಞರು',
      subtitle: 'ಅಧಿಕೃತ ಇ-ಖಾತಾ ನೋಂದಣಿಗಳು, ಮೂಲ ಆಸ್ತಿ ಪತ್ರಗಳ ಪತ್ತೆಹಚ್ಚುವಿಕೆ, ಕಾವೇರಿ ೨.೦ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಸಮನ್ವಯತೆ ಮತ್ತು ನಿಖರ ಮುದ್ರೆ ಶುಲ್ಕ ಪಾಲನೆಗಾಗಿ ನಿಮ್ಮ ನಂಬಿಕಸ್ಥ ಕಚೇರಿ.',
      ctaPrimary: 'ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      ctaSecondary: 'ನೋಂದಣಿ ವೆಚ್ಚವನ್ನು ಲೆಕ್ಕ ಹಾಕಿ',
      stat1Label: 'ಪರಿಶೀಲಿಸಿದ ದಾಖಲೆಗಳು',
      stat1Val: '೧,೨೦೦+',
      stat2Label: 'ಯಶಸ್ವಿ ನೋಂದಣಿಗಳು',
      stat2Val: '೧೦೦%',
      stat3Label: 'ಕಾವೇರಿ ನೋಂದಣಿ ಕಚೇರಿಗಳು',
      stat3Val: 'ಎಲ್ಲಾ ೪೪'
    },
    services: {
      badge: 'ನಮ್ಮ ಸೇವೆಗಳ ಪಟ್ಟಿ',
      title: 'ಸಂಪೂರ್ಣ ಆಸ್ತಿ ಸಂಬಂಧಿತ ಸೇವೆಗಳು',
      subtitle: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಸ್ತಿ ನೋಂದಣಿಗೆ ಅತ್ಯಗತ್ಯವಾಗಿ ಬೇಕಾಗಿರುವ ೨೪ ಪ್ರಮುಖ ಸೇವೆಗಳಿಗೆ ನಾವು ತಜ್ಞ ಕಾನೂನು ಮತ್ತು ದಾಖಲಾತಿ ನೆರವನ್ನು ನೀಡುತ್ತೇವೆ. ಆರಂಭಿಸಲು ನಿಮ್ಮ ವಿಭಾಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
      searchPlaceholder: '೨೪ ಸೇವೆಗಳಲ್ಲಿ ಹುಡುಕಿ...',
      shownOf: 'ಸೇವೆಗಳನ್ನು ತೋರಿಸಲಾಗಿದೆ (ಒಟ್ಟು ೨೪ ರಲ್ಲಿ)',
      resetFilters: 'ಫಿಲ್ಟರ್ ರದ್ದುಗೊಳಿಸಿ',
      requestBtn: 'ಸೇವೆಗಾಗಿ ಕೋರಿಕೆ ಸಲ್ಲಿಸಿ',
      advocateBadge: 'ವಕೀಲರ ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು ಸಮಾಲೋಚನೆ',
      advocateTitle: 'ಸಂಪೂರ್ಣ ಕಾನೂನು ಸೇವೆಗಳು ಲಭ್ಯವಿದೆ',
      advocateDesc: 'ನಮ್ಮ ಪ್ರಮುಖ ದಾಖಲಾತಿ ಪ್ರಕ್ರಿಯೆಗಳ ಜೊತೆಗೆ, ನುರಿತ ಆಸ್ತಿ ವಕೀಲರಿಂದ ಒಟ್ಟು ೩೦ ವರ್ಷಗಳ ಟೈಟಲ್ ವೆರಿಫಿಕೇಶನ್ ಮತ್ತು ಲೀಗಲ್ ಒಪಿನಿಯನ್ ಪಡೆದುಕೊಳ್ಳಬಹುದು. ಬೆಂಗಳೂರಿನ ಹಿರಿಯ ಆಸ್ತಿ ಕಾನೂನು ತಜ್ಞರ ಮೂಲಕ ನಿಮ್ಮ ಹೂಡಿಕೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ.',
      advocatePoint1: 'ಆಸ್ತಿ ಹಕ್ಕುಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ಕಾನೂನು ಅಭಿಪ್ರಾಯ (Legal Opinion)',
      advocatePoint2: 'ಕ್ರಯ ಪತ್ರ (Sale Deed) ಮತ್ತು ಒಪ್ಪಂದ ಪತ್ರಗಳ ತಯಾರಿ',
      advocatePoint3: 'ಜಂಟಿ ಅಭಿವೃದ್ಧಿ ಒಪ್ಪಂದಗಳ (JDA) ಕಾನೂನು ಪರಿಶೀಲನೆ',
      advocatePoint4: 'ದಾನ ಪತ್ರ (Gift Deed), ವಿಭಾಗ ಪತ್ರ ಮತ್ತು ಉಯಿಲು ನೋಂದಣಿ',
      pricingTitle: 'ಪಾರದರ್ಶಕ ಶುಲ್ಕ ಮತ್ತು ಸಮಾಲೋಚನೆ',
      pricingDesc: 'ಎಲ್ಲಾ ಸೇವೆಗಳ ಶುಲ್ಕವನ್ನು ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ನೇರವಾಗಿ ಚರ್ಚಿಸಲಾಗುತ್ತದೆ. ಯಾವುದೇ ಗುಪ್ತ ಕಮಿಷನ್ ಅಥವಾ ರಹಸ್ಯ ದಲ್ಲಾಳಿ ವೆಚ್ಚಗಳಿಲ್ಲದೆ ಸಂಪೂರ್ಣ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುತ್ತೇವೆ.',
      categories: {
        all: 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
        khata: 'ಖಾತಾ ಸೇವೆಗಳು',
        tax: 'ಆಸ್ತಿ ತೆರಿಗೆ',
        deeds: 'ಆಸ್ತಿ ಪತ್ರಗಳು ಮತ್ತು ನಕಲುಗಳು',
        land: 'ಭೂ ದಾಖಲೆಗಳು ಮತ್ತು ಸರ್ವೇ',
        approvals: 'ಬಾಡಿಗೆ ಮತ್ತು ಆಸ್ತಿಗಳು',
        search: 'ಪಿಐಡಿ ಮತ್ತು ಹುಡುಕಾಟ'
      },
      items: {
        'e-Khata Registration': {
          name: 'ಇ-ಖಾತಾ ನೋಂದಣಿ',
          desc: 'ಡಿಜಿಟಲ್ ಬಿಬಿಎಂಪಿ ಇ-ಖಾತಾ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ಮಾನ್ಯವಾದ ಪಿಐಡಿ (PID) ಯೊಂದಿಗೆ ನಿಮ್ಮ ಆಸ್ತಿಯನ್ನು ಹೊಸದಾಗಿ ನೋಂದಾಯಿಸಿ.',
          badge: 'ಡಿಜಿಟಲ್ ಇಂಡಿಯಾ'
        },
        'e-Khata Transfer': {
          name: 'ಇ-ಖಾತಾ ವರ್ಗಾವಣೆ (ಖಾತಾ ಬದಲಾವಣೆ)',
          desc: 'ಆಸ್ತಿ ನೋಂದಣಿ ಮುಗಿದ ನಂತರ ಮಾರಾಟಗಾರರಿಂದ ಖರೀದಿದಾರರಿಗೆ ಅಧಿಕೃತವಾಗಿ ಇ-ಖಾತಾ ವರ್ಗಾವಣೆ ಮಾಡಿಕೊಡುವುದು.',
          badge: 'ಹಕ್ಕು ಬದಲಾವಣೆ'
        },
        'A Khata Assistance': {
          name: 'ಎ ಖಾತಾ ಸಹಾಯ',
          desc: 'ಬ್ಯಾಂಕ್ ಸಾಲಗಳು ಮತ್ತು ಕಟ್ಟಡ ನಿರ್ಮಾಣ ಅನುಮತಿಗಳನ್ನು ಸುಲಭವಾಗಿ ಪಡೆಯಲು ಎ-ಖಾತಾ ನೋಂದಣಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
          badge: 'ಪ್ರೀಮಿಯಂ ಹಕ್ಕು'
        },
        'B Khata Assistance': {
          name: 'ಬಿ ಖಾತಾ ಸಹಾಯ',
          desc: 'ಬಿ-ಖಾತಾ ದಾಖಲಾತಿ ಪರಿಶೀಲನೆ, ತೆರಿಗೆ ಪಾವತಿ ಮತ್ತು ಭೂ ಪರಿವರ್ತನೆ ನಿಯಮಗಳ ಬಗ್ಗೆ ಸಮಗ್ರ ನೆರವು.',
          badge: 'ಅನುಸರಣೆ'
        },
        'Khata Extract': {
          name: 'ಖಾತಾ ಇಳಿಸು (Khata Extract)',
          desc: 'ಆಸ್ತಿಯ ಅಳತೆ, ಮೌಲ್ಯ ಮತ್ತು ತೆರಿಗೆ ಪಾವತಿಯ ಇತಿಹಾಸವನ್ನು ವಿವರಿಸುವ ಅಧಿಕೃತ ಪ್ರಮಾಣೀಕೃತ ಖಾತಾ ಇಳಿಸು ಪಡೆಯಿರಿ.',
          badge: 'ಪರಿಶೀಲನೆ'
        },
        'Khata Certificate': {
          name: 'ಖಾತಾ ಪ್ರಮಾಣಪತ್ರ (Khata Certificate)',
          desc: 'ನಗರಸಭೆಯ ತೆರಿಗೆ ರಿಜಿಸ್ಟರ್ ಅಡಿಯಲ್ಲಿ ಆಸ್ತಿ ನೋಂದಣಿಯಾಗಿರುವುದನ್ನು ಸಾಬೀತುಪಡಿಸುವ ಪ್ರಮಾಣಪತ್ರ ಪಡೆದುಕೊಳ್ಳಿ.',
          badge: 'ಅಧಿಕೃತ ಪುರಾವೆ'
        },
        'Property Tax Assessment': {
          name: 'ಆಸ್ತಿ ತೆರಿಗೆ ಮೌಲ್ಯಮಾಪನ',
          desc: 'ಕಾನೂನು ದಂಡಗಳು ಅಥವಾ ಬಾಕಿಗಳನ್ನು ತಪ್ಪಿಸಲು ನಿಮ್ಮ ಆಸ್ತಿ ತೆರಿಗೆಯನ್ನು ನಿಖರವಾಗಿ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ ಸಲ್ಲಿಕೆ ಮಾಡುವುದು.',
          badge: 'ತೆರಿಗೆ ಲೆಕ್ಕಾಚಾರ'
        },
        'Property Tax Payment Assistance': {
          name: 'ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿ ನೆರವು',
          desc: 'ತೆರಿಗೆ ರಶೀದಿ ಮತ್ತು ತೆರಿಗೆ ಪಾವತಿಯ ಗಣಕೀಕೃತ ದಾಖಲೆಗಳನ್ನು ಆನ್‌ಲೈನ್ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸುವುದು.',
          badge: 'ತ್ವರಿತ ಪಾವತಿ'
        },
        'Property Tax Name Transfer': {
          name: 'ಆಸ್ತಿ ತೆರಿಗೆಯಲ್ಲಿ ಹೆಸರು ಬದಲಾವಣೆ',
          desc: 'ಆಸ್ತಿ ಖರೀದಿಸಿದ ನಂತರ ಅಥವಾ ಪಿತ್ರಾರ್ಜಿತವಾಗಿ ಬಂದಾಗ ತೆರಿಗೆ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಮಾಲೀಕತ್ವದ ಹೆಸರನ್ನು ನವೀಕರಿಸಿ.',
          badge: 'ಮಾಲೀಕರ ನವೀಕರಣ'
        },
        'Encumbrance Certificate (EC)': {
          name: 'ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (EC - ಇಸಿ)',
          desc: 'ಆಸ್ತಿಯ ಮೇಲೆ ಯಾವುದೇ ಸಕ್ರಿಯ ಅಡಮಾನಗಳು ಅಥವಾ ಕಾನೂನು ವಿವಾದಗಳಿಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಲು ಫಾರ್ಮ್ ೧೫/೧೬ ಇಸಿ ಪಡೆಯಿರಿ.',
          badge: 'ಶುದ್ಧ ಇತಿಹಾಸ'
        },
        'Certified Copies of Sale Deed': {
          name: 'ಕ್ರಯ ಪತ್ರದ ದೃಢೀಕೃತ ನಕಲು (Certified Copy)',
          desc: 'ಕಾವೇರಿ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಿಂದ ನಿಮ್ಮ ನೋಂದಾಯಿತ ಕ್ರಯ ಪತ್ರದ ಕಾನೂನುಬದ್ಧ ದೃಢೀಕೃತ ನಕಲನ್ನು ಪಡೆಯಿರಿ.',
          badge: 'ಕಾನೂನು ನಕಲು'
        },
        'Previous Title Documents': {
          name: 'ಹಳೆಯ ಮಾಲೀಕತ್ವದ ದಾಖಲೆಗಳು',
          desc: 'ಹಳೆಯ ಆಸ್ತಿ ಒಪ್ಪಂದಗಳು, ವಿಭಾಗ ಪತ್ರಗಳು ಮತ್ತು ಇತ್ಯರ್ಥ ಪತ್ರಗಳ ಮೂಲ ಹುಡುಕಾಟ ಮತ್ತು ಪರಿಶೀಲನೆ.',
          badge: 'ಆಡಿಟ್ ಸಹಾಯ'
        },
        'Missing Property Document Retrieval': {
          name: 'ಕಳೆದುಹೋದ ಆಸ್ತಿ ದಾಖಲೆಗಳ ಮರುಪಡೆಯುವಿಕೆ',
          desc: 'ಸರ್ಕಾರಿ ದಾಖಲೆ ರಕ್ಷಣೆ ಕೇಂದ್ರಗಳಿಂದ ಕಳೆದುಹೋದ ಅಥವಾ ಹಾನಿಗೊಳಗಾದ ಆಸ್ತಿ ಪತ್ರಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಹೊರತೆಗೆಯುವುದು.',
          badge: 'ದಾಖಲೆ ಪತ್ತೆ'
        },
        'RTC / Pahani': {
          name: 'ಆರ್‌ಟಿಸಿ / ಪಹಣಿ ದಾಖಲೆ',
          desc: 'ಭೂಮಿ ತಂತ್ರಾಂಶ ವ್ಯವಸ್ಥೆಯಿಂದ ಅಧಿಕೃತ ಹಕ್ಕುಗಳು, ಗೇಣಿ ಮತ್ತು ಬೆಳೆಗಳ ದಾಖಲೆಯನ್ನು (RTC) ಪಡೆದುಕೊಳ್ಳಿ.',
          badge: 'ಭೂಮಿ ದಾಖಲೆ'
        },
        'Mutation Register Extract (MR)': {
          name: 'ಮ್ಯುಟೇಷನ್ ರಿಜಿಸ್ಟರ್ ಇಳಿಸು (MR)',
          desc: 'ಕೃಷಿ ಅಥವಾ ಕೃಷಿಯೇತರ ಜಮೀನಿನ ಮಾಲೀಕತ್ವ ಬದಲಾವಣೆಯನ್ನು ಖಚಿತಪಡಿಸುವ ಮ್ಯುಟೇಷನ್ ದಾಖಲೆ ಪಡೆಯಿರಿ.',
          badge: 'ಕಂದಾಯ ದಾಖಲೆ'
        },
        'Survey Sketch': {
          name: 'ಸರ್ವೇ ಸ್ಕೆಚ್ (೧೧ಇ)',
          desc: 'ಆಸ್ತಿಯ ನಿಖರವಾದ ಗಡಿರೇಖೆಗಳು ಮತ್ತು ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ತೋರಿಸುವ ಅಧಿಕೃತ ೧೧ಇ ಸರ್ವೇ ನಕ್ಷೆ.',
          badge: 'ಜಮೀನು ಗಡಿ'
        },
        'Tippani': {
          name: 'ಟಿಪ್ಪಣಿ ನಕ್ಷೆ',
          desc: 'ಭೌತಿಕ ಸರ್ವೇ ನಕ್ಷೆಗಳು ಮತ್ತು ಆಸ್ತಿಯ ಮೂಲ ವಿಭಾಗದ ರೇಖೆಗಳನ್ನು ಸೂಚಿಸುವ ಟಿಪ್ಪಣಿ ದಾಖಲೆ ಮರುಪಡೆಯುವಿಕೆ.',
          badge: 'ಸರ್ವೇ ಪುರಾವೆ'
        },
        'Village Map': {
          name: 'ಗ್ರಾಮದ ನಕ್ಷೆ (Village Map)',
          desc: 'ಸುತ್ತಮುತ್ತಲಿನ ಸರ್ವೇ ನಂಬರ್‌ಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ರಸ್ತೆಗಳು/ಕಾಲುವೆಗಳನ್ನು ತೋರಿಸುವ ಅಧಿಕೃತ ಗ್ರಾಮ ನಕ್ಷೆಗಳು.',
          badge: 'ವಲಯ ನಕ್ಷೆ'
        },
        'Akarband': {
          name: 'ಆಕಾರ್‌ಬಂಡ್ ರಿಜಿಸ್ಟರ್',
          desc: 'ಭೂಮಿಯ ಮೌಲ್ಯಮಾಪನ, ಸರ್ವೇ ವಿವರಗಳು ಮತ್ತು ತೆರಿಗೆ ದರಗಳನ್ನು ತೋರಿಸುವ ಅಧಿಕೃತ ಆಕಾರ್‌ಬಂಡ್ ಪ್ರತಿ.',
          badge: 'ರಿಜಿಸ್ಟರ್ ಪ್ರತಿ'
        },
        'Rental Houses Assistance': {
          name: 'ಬಾಡಿಗೆ ಮನೆ ಮತ್ತು ರೂಮ್ ಹುಡುಕಾಟ',
          desc: 'ನೀವು ಬಾಡಿಗೆಗೆ ಕೊಠಡಿಗಳು ಅಥವಾ ಮನೆಗಳನ್ನು ಹುಡುಕುತ್ತಿದ್ದರೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ! ಸೂಕ್ತವಾದ ಬಾಡಿಗೆ ಆಸ್ತಿಯನ್ನು ಪಡೆಯಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
          badge: 'ಬಾಡಿಗೆ'
        },
        'Urban Property Land Services': {
          name: 'ನಗರ ಆಸ್ತಿ ಖರೀದಿ ಮತ್ತು ಮಾರಾಟದ ಸಂಪರ್ಕ ಸೇವೆ',
          desc: 'ನಿಮ್ಮ ನಗರ ಆಸ್ತಿ ಅಥವಾ ನಿವೇಶನವನ್ನು ಮಾರಾಟ ಮಾಡಲು ಅಥವಾ ಖರೀದಿಸಲು ಬಯಸುವಿರಾ? ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಾವು ಅಧಿಕೃತ ಗ್ರಾಹಕರು ಮತ್ತು ಮಾರಾಟಗಾರರನ್ನು ನೇರವಾಗಿ ಜೋಡಿಸುತ್ತೇವೆ.',
          badge: 'ನಗರ ಸಂಪರ್ಕ'
        },
        'Rural Property Land Services': {
          name: 'ಗ್ರಾಮೀಣ ಮತ್ತು ಕೃಷಿ ಜಮೀನು ಖರೀದಿ-ಮಾರಾಟ ಸಂಪರ್ಕ',
          desc: 'ಕೃಷಿ ಜಮೀನು ಅಥವಾ ಗ್ರಾಮೀಣ ಆಸ್ತಿಯನ್ನು ಮಾರಾಟ ಮಾಡಲು ಅಥವಾ ಖರೀದಿಸಲು ಬಯಸುವಿರಾ? ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಾವು ಅತ್ಯಂತ ಸುಲಭವಾಗಿ ಗ್ರಾಹಕರು ಮತ್ತು ಮಾರಾಟಗಾರರನ್ನು ಜೋಡಿಸುತ್ತೇವೆ.',
          badge: 'ಗ್ರಾಮೀಣ ಸಂಪರ್ಕ'
        },
        'Property PID Search': {
          name: 'ಆಸ್ತಿ ಪಿಐಡಿ (PID) ಹುಡುಕಾಟ',
          desc: 'ಬಿಬಿಎಂಪಿ ದಾಖಲೆಗಳಲ್ಲಿ ನಿಮ್ಮ ಆಸ್ತಿಯ ವಿಶಿಷ್ಟ ಗುರುತಿನ ಸಂಖ್ಯೆಯನ್ನು (PID) ಪತ್ತೆಹಚ್ಚಿ ಪರಿಶೀಲಿಸಿ.',
          badge: 'ಪಿಐಡಿ ಐಡಿ'
        },
        'BBMP Property Details Search': {
          name: 'ಬಿಬಿಎಂಪಿ ಆಸ್ತಿ ವಿವರಗಳ ಶೋಧನೆ',
          desc: 'ನೋಂದಾಯಿತ ಆಸ್ತಿಯ ಅಳತೆಗಳು, ವಲಯ ವರ್ಗೀಕರಣ ಮತ್ತು ತೆರಿಗೆ ಸ್ಥಿತಿಯ ಸಂಪೂರ್ಣ ಹಿನ್ನೆಲೆ ಪರಿಶೀಲನೆ.',
          badge: 'ಬಿಬಿಎಂಪಿ ಶೋಧನೆ'
        }
      }
    },
    calculator: {
      badge: 'ಮುದ್ರೆ ಶುಲ್ಕ ಅಂದಾಜು',
      title: 'ಕರ್ನಾಟಕ ಮುದ್ರೆ ಶುಲ್ಕ ಮತ್ತು ನೋಂದಣಿ ವೆಚ್ಚದ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      subtitle: '೨೦೨೬ ರ ಬೆಂಗಳೂರಿನ ಇತ್ತೀಚಿನ ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ ನಿಮ್ಮ ಸರ್ಕಾರಿ ನೋಂದಣಿ ವೆಚ್ಚಗಳು ಮತ್ತು ಕಾನೂನು ಪತ್ರಗಳ ತಯಾರಿಕೆಯ ಶುಲ್ಕಗಳ ತ್ವರಿತ ಅಂದಾಜು ಪಡೆಯಿರಿ.',
      configureTitle: 'ಆಸ್ತಿಯ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ',
      configureDesc: 'ನಿಜಾವಧಿಯ ನೋಂದಣಿ ವೆಚ್ಚಗಳನ್ನು ಪಡೆಯಲು ಆಸ್ತಿಯ ಮೌಲ್ಯಗಳನ್ನು ಹೊಂದಿಸಿ',
      guidanceLabel: 'ಆಸ್ತಿಯ ಮೌಲ್ಯ / ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯ (Guidance Value)',
      lakhs: 'ಲಕ್ಷಗಳು',
      crores: 'ಕೋಟಿಗಳು',
      categoryLabel: 'ಆಸ್ತಿಯ ವಿಧ',
      categories: {
        apartment: 'ಅಪಾರ್ಟ್ಮೆಂಟ್/ಫ್ಲಾಟ್',
        independent: 'ಸ್ವತಂತ್ರ ಮನೆ/ವಿಲ್ಲಾ',
        plot: 'ಖಾಲಿ ನಿವೇಶನ/ಜಮೀನು',
        villa: 'ಐಷಾರಾಮಿ ವಿಲ್ಲಾ'
      },
      locationLabel: 'ಆಸ್ತಿ ಇರುವ ವ್ಯಾಪ್ತಿ (ಬೆಂಗಳೂರು)',
      locations: {
        bbmp: { label: 'ಬಿಬಿಎಂಪಿ ನಗರ ವ್ಯಾಪ್ತಿ', desc: 'ಬೆಂಗಳೂರು ನಗರ (೫.೬% ಮುದ್ರೆ ಶುಲ್ಕ)' },
        bda_bmrda: { label: 'ಬಿಡಿಎ / ಬಿಎಂಆರ್‌ಡಿಎ ವ್ಯಾಪ್ತಿ', desc: 'ಹೊರವಲಯಗಳು (೫.೬೫% ಮುದ್ರೆ ಶುಲ್ಕ)' },
        panchayat_rural: { label: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿ', desc: 'ಗ್ರಾಮೀಣ ಭಾಗ (೫.೫% ಮುದ್ರೆ ಶುಲ್ಕ)' }
      },
      guidanceRuleTitle: 'ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯದ ನಿಯಮ:',
      guidanceRuleDesc: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಮುದ್ರೆ ಶುಲ್ಕವನ್ನು ಸರ್ಕಾರದ ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯ ಅಥವಾ ನಿಮ್ಮ ಖರೀದಿ ಒಪ್ಪಂದದ ಮೌಲ್ಯ—ಇವೆರಡರಲ್ಲಿ ಯಾವುದು ಹೆಚ್ಚೋ ಅದರ ಮೇಲೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ. ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯಕ್ಕಿಂತ ಕಡಿಮೆ ನೋಂದಾಯಿಸುವುದು ಕಾನೂನುಬಾಹಿರ ಮತ್ತು ದಂಡಾರ್ಹ.',
      kaveriCostHeader: 'ಕಾವೇರಿ ೨.೦ ವೆಚ್ಚದ ವಿವರ',
      estimateTitle: 'ವೆಚ್ಚದ ಅಂದಾಜು ಪಟ್ಟಿ',
      totalEstimatedCost: 'ಒಟ್ಟು ಅಂದಾಜು ವೆಚ್ಚ',
      govFees: 'ಸರ್ಕಾರಿ ಶುಲ್ಕ',
      serviceFees: 'ಸೇವಾ ಶುಲ್ಕ',
      baseStampDuty: 'ಮೂಲ ಮುದ್ರೆ ಶುಲ್ಕ (೫.೦%)',
      infraCess: 'ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಗ್ರಂಥಾಲಯ ಸೆಸ್ (SD ಯ ೧೦%)',
      urbanSurcharge: 'ನಗರ ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ (Surcharge)',
      registrationCharge: 'ನೋಂದಣಿ ಶುಲ್ಕ (೧.೦%)',
      flatLegalFee: 'ನಮ್ಮ ನಿಗದಿತ ಕಾನೂನು ಸೇವಾ ಶುಲ್ಕ',
      disclaimer: '*ಗಮನಿಸಿ: ಸರ್ಕಾರಿ ಶುಲ್ಕಗಳನ್ನು ಪ್ರಸ್ತುತ ಕಾವೇರಿ ೨.೦ ನಿಯಮಗಳ ಪ್ರಕಾರ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ. ಬಿಬಿಎಂಪಿ/ಬಿಡಿಎ ನಿಗದಿಪಡಿಸುವ ವಲಯವಾರು ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಇದು ಸ್ವಲ್ಪ ಬದಲಾಗಬಹುದು.',
      ctaButton: 'ವೆಚ್ಚ ಖಚಿತಪಡಿಸಿ ಮತ್ತು ಏಜೆಂಟ್ ಸಹಾಯ ಪಡೆಯಿರಿ',
      escrowTitle: '೧೦೦% ಸುರಕ್ಷಿತ ಪಾವತಿ',
      escrowDesc: 'ನಿಮ್ಮ ಮುದ್ರೆ ಶುಲ್ಕ ಮತ್ತು ನೋಂದಣಿ ಶುಲ್ಕವನ್ನು ನೇರವಾಗಿ ಸರ್ಕಾರಿ ಬ್ಯಾಂಕ್ ಚಲನ್ ಮೂಲಕ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಇಲಾಖೆಗೆ ಪಾವತಿಸಲಾಗುತ್ತದೆ. ನಾವು ಯಾವುದೇ ಸರ್ಕಾರಿ ಹಣವನ್ನು ನಮ್ಮ ಬಳಿ ಇಟ್ಟುಕೊಳ್ಳುವುದಿಲ್ಲ.'
    },
    checklist: {
      badge: 'ಪರಿಶೀಲನಾ ಸಹಾಯ',
      title: 'ಆಸ್ತಿ ದಾಖಲೆಗಳ ಇಂಟರಾಕ್ಟಿವ್ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
      subtitle: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿಗಳ ಕಚೇರಿಯಲ್ಲಿ ನೋಂದಣಿಗೆ ಬೇಕಾಗುವ ಕಾನೂನು ಪತ್ರಗಳನ್ನು ತಿಳಿಯಲು ನಿಮ್ಮ ಆಸ್ತಿ ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ನಿಮ್ಮ ಸಿದ್ಧತೆ ತಿಳಿಯಲು ಟಿಕ್ ಮಾಡಿ.',
      tabs: {
        resale: { label: 'ಮರುಮಾರಾಟ ಅಪಾರ್ಟ್ಮೆಂಟ್/ಮನೆ', desc: 'ವೈಯಕ್ತಿಕ ಮಾರಾಟಗಾರರಿಂದ' },
        builder: { label: 'ಹೊಸ ಬಿಲ್ಡರ್ ಫ್ಲಾಟ್', desc: 'ನೇರವಾಗಿ ಡೆವಲಪರ್‌ನಿಂದ' },
        plot: { label: 'ಖಾಲಿ ನಿವೇಶನ/ಜಮೀನು', desc: 'ಸೈಟ್ ಅಥವಾ ಪ್ಲಾಟ್ ಖರೀದಿ' },
        gift: { label: 'ದಾನ ಪತ್ರ / ಕುಟುಂಬ ವರ್ಗಾವಣೆ', desc: 'ಕುಟುಂಬದವರ ನಡುವೆ ವರ್ಗಾವಣೆ' }
      },
      preparednessScore: 'ದಾಖಲೆಗಳ ಸಿದ್ಧತೆಯ ಸ್ಕೋರ್',
      prepared: 'ಸಿದ್ಧಗೊಂಡಿದೆ',
      of: 'ಒಟ್ಟು',
      requiredBadge: 'ಖಂಡಿತವಾಗಿಯೂ ಬೇಕಾದ ದಾಖಲೆ',
      optionalBadge: 'ಷರತ್ತುಬದ್ಧ / ಐಚ್ಛಿಕ ದಾಖಲೆ',
      missingTitle: 'ಕೆಲವು ದಾಖಲೆಗಳು ಇಲ್ವಾ?',
      missingDesc: 'ನಿಮ್ಮ ಬಳಿ ಮೂಲ ಮದರ್ ಡೀಡ್, ಪ್ರಸ್ತುತ ಇಸಿ ಅಥವಾ ಖಾತಾ ಇಲ್ಲದಿದ್ದರೆ, ನಾವು ಬಿಬಿಎಂಪಿ, ಸಕಾಲ ಮತ್ತು ಕಾವೇರಿ ದಾಖಲೆ ಕೇಂದ್ರಗಳಿಂದ ಅಧಿಕೃತ ನಕಲುಗಳನ್ನು ನಿಮಗಾಗಿ ಹೊರತೆಗೆಯಬಹುದು.',
      missingBtn: 'ದಾಖಲೆ ಹೊರತೆಗೆಯಲು ಸಹಾಯ ಪಡೆಯಿರಿ',
      items: {
        b1: { name: 'ಮದರ್ ಡೀಡ್ / ಮೂಲ ಪತ್ರಗಳು', badge: 'ಮಾಲೀಕತ್ವದ ಸರಪಳಿ', description: 'ಆಸ್ತಿಯ ಹಳೆಯ ಮಾಲೀಕತ್ವದ ಇತಿಹಾಸವನ್ನು ತೋರಿಸುತ್ತದೆ. ಬಿಲ್ಡರ್ ಜಮೀನಿನ ಸಂಪೂರ್ಣ ಹಕ್ಕನ್ನು ಹೊಂದಿದ್ದಾರೆಯೇ ಎಂದು ತಿಳಿಯಲು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇದು ಅತ್ಯಂತ ಮುಖ್ಯ.' },
        b2: { name: 'ಜಂಟಿ ಅಭಿವೃದ್ಧಿ ಒಪ್ಪಂದ (JDA)', badge: 'ಭೂಮಾಲೀಕರ ಪಾಲು', description: 'ಭೂಮಾಲೀಕರು ಮತ್ತು ಬಿಲ್ಡರ್ ನಡುವೆ ಫ್ಲಾಟ್‌ಗಳು ಅಥವಾ ಆದಾಯದ ಹಂಚಿಕೆಯ ಕಾನೂನು ವಿಭಜನೆಯನ್ನು ಇದು ತೋರಿಸುತ್ತದೆ.' },
        b3: { name: 'ಬಿಬಿಎಂಪಿ ಕಟ್ಟಡ ನಕ್ಷೆ ಮಂಜೂರಾತಿ ಪ್ರತಿ', badge: 'ಅನುಮೋದಿತ ಪ್ಲಾನ್', description: 'ಬಿಬಿಎಂಪಿ ಅಥವಾ ಬಿಡಿಎ ಅನುಮೋದಿಸಿದ ನಕ್ಷೆ. ಕಟ್ಟಡ ನಿರ್ಮಾಣ ನಿಯಮಗಳ ಉಲ್ಲಂಘನೆಯಾಗಿಲ್ಲ ಎಂಬುದನ್ನು ಇದು ಖಚಿತಪಡಿಸುತ್ತದೆ.' },
        b4: { name: 'ಕೆ-ರೇರಾ (K-RERA) ನೋಂದಣಿ ಪತ್ರ', badge: 'ರೇರಾ ಅನುಸರಣೆ', description: 'ಕರ್ನಾಟಕ ರಿಯಲ್ ಎಸ್ಟೇಟ್ ನಿಯಂತ್ರಣ ಪ್ರಾಧಿಕಾರದ ಪ್ರಮಾಣಪತ್ರ. ೮ ಕ್ಕಿಂತ ಹೆಚ್ಚು ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಳಿರುವ ಯೋಜನೆಗಳಿಗೆ ಇದು ಕಡ್ಡಾಯ.' },
        b5: { name: 'ಸ್ವಾಧೀನ ಪ್ರಮಾಣಪತ್ರ (Occupancy Certificate - OC)', badge: 'ವಸತಿ ಅರ್ಹತೆ', description: 'ಯೋಜನೆಯಂತೆ ಕಟ್ಟಡ ಪೂರ್ಣಗೊಂಡಾಗ ಬಿಬಿಎಂಪಿ ನೀಡುತ್ತದೆ. ವಿದ್ಯುತ್ (BESCOM), ನೀರು (BWSSB) ಮತ್ತು ಹೋಮ್ ಲೋನ್ ಪಡೆಯಲು ಇದು ಅತ್ಯಂತ ಕಡ್ಡಾಯ.' },
        b6: { name: 'ಫ್ಲಾಟ್ ಹಂಚಿಕೆ ಪತ್ರ ಮತ್ತು ಒಪ್ಪಂದ ಪತ್ರ', badge: 'ಖರೀದಿ ಪುರಾವೆ', description: 'ಖರೀದಿಯ ಮುಂಗಡ ರಶೀದಿ ಮತ್ತು ಪಾವತಿ ವಿವರಗಳು ಹಾಗೂ ಫ್ಲಾಟ್ ಸಂಖ್ಯೆಯನ್ನು ಸೂಚಿಸುವ ಒಪ್ಪಂದ ಪತ್ರ.' },
        b7: { name: 'ಬೆಸ್ಕಾಂ ಮತ್ತು ಬಿಡಬ್ಲ್ಯೂಎಸ್‌ಎಸ್‌ಬಿ ನಿಂದ ಎನ್‌ಒಸಿ', badge: 'ಸೇವಾವಾರು ಕ್ಲಿಯರೆನ್ಸ್', description: 'ಬೆಂಗಳೂರು ವಿದ್ಯುತ್ ಸರಬರಾಜು ಕಂಪನಿ ಮತ್ತು ಬೆಂಗಳೂರು ಜಲಮಂಡಳಿಯಿಂದ ಆಕ್ಷೇಪಣಾ ರಹಿತ ಪತ್ರ.' },
        b8: { name: 'ಖರೀದಿದಾರರ ಪ್ಯಾನ್ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್', badge: 'ಗುರುತಿನ ಚೀಟಿ', description: 'ಬಯೋಮೆಟ್ರಿಕ್ ನೋಂದಣಿಗೆ ಬೇಕಾಗುವ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಗುರುತಿನ ಚೀಟಿಗಳು.' },
        r1: { name: 'ಮೂಲ ಮದರ್ ಡೀಡ್', badge: 'ಮಾಲೀಕತ್ವದ ಇತಿಹಾಸ', description: 'ಆಸ್ತಿಯ ಮೇಲೆ ಯಾವುದೇ ಹಕ್ಕುಸ್ವಾಮ್ಯದ ಕೊರತೆಯಿಲ್ಲ ಎಂದು ಸಾಬೀತುಪಡಿಸಲು ಕನಿಷ್ಠ ಕಳೆದ ೩೦ ವರ್ಷಗಳ ಸರಣಿ ದಾಖಲೆಗಳು.' },
        r2: { name: 'ನೋಂದಾಯಿತ ಹಳೆಯ ಕ್ರಯ ಪತ್ರಗಳು', badge: 'ಪ್ರಸ್ತುತ ಮಾಲೀಕತ್ವ', description: 'ಪ್ರಸ್ತುತ ಮಾರಾಟಗಾರನು ಹಿಂದಿನ ಮಾಲೀಕರಿಂದ ಆಸ್ತಿಯನ್ನು ಹೇಗೆ ಪಡೆದುಕೊಂಡನು ಎಂಬುದನ್ನು ತೋರಿಸುವ ನೋಂದಾಯಿತ ಪತ್ರ.' },
        r3: { name: 'ಇತ್ತೀಚಿನ ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (ಇಸಿ - EC)', badge: 'ಫಾರ್ಮ್ ೧೫', description: 'ಕಾವೇರಿ ಪೋರ್ಟಲ್‌ನಿಂದ ನೀಡಲಾದ ಫಾರ್ಮ್ ೧೫ ಪ್ರಮಾಣಪತ್ರ. ಆಸ್ತಿಯ ಮೇಲೆ ಯಾವುದೇ ಸಕ್ರಿಯ ಲೋನ್ ಅಥವಾ ಕಾನೂನು ವಿವಾದವಿಲ್ಲದಿರುವುದಕ್ಕೆ ಸಾಕ್ಷಿ.' },
        r4: { name: 'ಬಿಬಿಎಂಪಿ ಎ-ಖಾತಾ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಇಳಿಸು', badge: 'ತೆರಿಗೆ ಲೆಡ್ಜರ್', description: 'ಆಸ್ತಿಯು ಬಿಬಿಎಂಪಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ನೋಂದಣಿಯಾಗಿರುವ ಪುರಾವೆ. ಖಾತಾ ಬದಲಾವಣೆಗೆ ಪ್ರಸ್ತುತ ಸಾಲಿನ ಖಾತಾ ಇಳಿಸು ಬೇಕು.' },
        r5: { name: 'ಇತ್ತೀಚಿನ ಬಿಬಿಎಂಪಿ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿ ರಶೀದಿ', badge: 'ತೆರಿಗೆ ಬಾಕಿ ಇಲ್ಲ', description: 'ಪ್ರಸ್ತುತ ವರ್ಷದ ತೆರಿಗೆ ರಶೀದಿಗಳು. ತೆರಿಗೆಯಲ್ಲಿ ೧ ರೂಪಾಯಿ ಬಾಕಿ ಇದ್ದರೂ ಖಾತಾ ವರ್ಗಾವಣೆಯನ್ನು ಸಿಸ್ಟಮ್ ಲಾಕ್ ಮಾಡುತ್ತದೆ.' },
        r6: { name: 'ಅಪಾರ್ಟ್ಮೆಂಟ್ ಅಸೋಸಿಯೇಷನ್‌ನಿಂದ ಎನ್‌ಒಸಿ (NOC)', badge: 'ಸೊಸೈಟಿ ಎನ್‌ಒಸಿ', description: 'ಮಾಲೀಕರ ಸಂಘದಿಂದ ಯಾವುದೇ ಬಾಕಿ ಇಲ್ಲದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸುವ ಮತ್ತು ಹೊಸ ಸದಸ್ಯರನ್ನು ಸ್ವಾಗತಿಸುವ ಪತ್ರ.' },
        r7: { name: 'ಮೂಲ ಬಿಲ್ಡಿಂಗ್ ಪ್ಲಾನ್ ಸ್ಯಾಂಕ್ಷನ್ ಮತ್ತು ಸಿಸಿ/ಒಸಿ', badge: 'ಅನುಮೋದಿತ ಸ್ಥಿತಿ', description: 'ಆಸ್ತಿಯನ್ನು ಕಾನೂನುಬದ್ಧವಾಗಿ ಯಾವುದೇ ಉಲ್ಲಂಘನೆಗಳಿಲ್ಲದೆ ನಿರ್ಮಿಸಲಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ.' },
        r8: { name: 'ಸಾಕ್ಷಿದಾರರ ಗುರುತಿನ ಚೀಟಿಗಳು ಮತ್ತು ಕೆವೈಸಿ', badge: 'ಉಪ ನೋಂದಣಿ ಕಚೇರಿ', description: 'ನೋಂದಣಿ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮೊಂದಿಗೆ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಗೆ ಬರಬೇಕಾದ ಇಬ್ಬರು ಸಾಕ್ಷಿದಾರರ ಆಧಾರ್ ಮತ್ತು ಪ್ಯಾನ್ ಕಾರ್ಡ್.' },
        p1: { name: 'ಮದರ್ ಡೀಡ್ / ಮೂಲ ದಾಖಲೆ', badge: 'ಜಮೀನು ಸರಪಳಿ', description: 'ಐತಿಹಾಸಿಕ ಜಮೀನು ಮಾಲೀಕತ್ವದ ಇತಿಹಾಸ. ಭೂ ಪರಿವರ್ತನೆಯ ಇತಿಹಾಸ ತಿಳಿಯಲು ಇದು ಬಹಳ ಮುಖ್ಯ.' },
        p2: { name: 'ಭೂ ಪರಿವರ್ತನಾ ಪ್ರಮಾಣಪತ್ರ (ಆಕಾರ್‌ಬಂಡ್)', badge: 'ಡಿಸಿ ಕನ್ವರ್ಷನ್', description: 'ಜಿಲ್ಲಾಧಿಕಾರಿಗಳು (DC) ಕೃಷಿ ಜಮೀನನ್ನು ವಸತಿ ಉದ್ದೇಶಕ್ಕೆ ಪರಿವರ್ತಿಸಿ ನೀಡಿದ ಅಧಿಕೃತ ಆದೇಶ ಪತ್ರ.' },
        p3: { name: 'ಬಿಡಿಎ/ಬಿಎಂಆರ್‌ಡಿಎ ಲೇಔಟ್ ಅನುಮೋದನೆ', badge: 'ಅನುಮೋದಿತ ಲೇಔಟ್', description: 'ಬೆಂಗಳೂರು ಯೋಜನಾ ಪ್ರಾಧಿಕಾರಗಳಿಂದ ಅನುಮೋದಿತ ನಕ್ಷೆ. ಅನುಮೋದನೆ ಇಲ್ಲದ ಸೈಟ್‌ಗಳು ಕಾನೂನುಬಾಹಿರವಾಗಿರುತ್ತವೆ.' },
        p4: { name: 'ಇತ್ತೀಚಿನ ಖಾತಾ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಇಳಿಸು', badge: 'ಇ-ಖಾತಾ / ಬಿಬಿಎಂಪಿ', description: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಫಾರ್ಮ್ ೯/೧೧ ಇ-ಖಾತಾ ಅಥವಾ ಬಿಬಿಎಂಪಿ ಖಾತಾ ಪತ್ರ.' },
        p5: { name: '೩೦ ವರ್ಷಗಳ ನಿಲ್-ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (Nil-EC)', badge: 'ವಿವಾದ ರಹಿತ ಇತಿಹಾಸ', description: 'ಪ್ಲಾಟ್ ಅನ್ನು ಯಾವುದೇ ಸಹಕಾರಿ ಬ್ಯಾಂಕ್ ಅಥವಾ ಖಾಸಗಿ ಸಂಸ್ಥೆಗಳಿಗೆ ಅಡವಿಟ್ಟಿಲ್ಲ ಎಂಬುದರ ಖಾತರಿ.' },
        p6: { name: 'ಪ್ಲಾಟ್ ನಕ್ಷೆ ಮತ್ತು ಸರ್ವೇ ಸ್ಕೆಚ್', badge: 'ನಿಖರವಾದ ಅಳತೆ', description: 'ಭೌತಿಕ ಪ್ಲಾಟ್ ಅಳತೆಗಳು ಮತ್ತು ದಿಕ್ಕುಗಳು ನಿಮ್ಮ ಕ್ರಯ ಪತ್ರದಲ್ಲಿ ನಮೂದಿಸಿರುವ ಅಳತೆಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತವೆಯೇ ಎಂಬ ಪರಿಶೀಲನೆ.' },
        g1: { name: 'ಮೂಲ ಮಾಲೀಕತ್ವದ ಕ್ರಯ ಪತ್ರ', badge: 'ಕೊಡುವವರ ಪುರಾವೆ', description: 'ದಾನ ನೀಡುವವರು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಸ್ತಿಯನ್ನು ಹೇಗೆ ಪಡೆದರು ಎಂಬುದಕ್ಕೆ ಸಾಕ್ಷಿ ದಾಖಲೆ.' },
        g2: { name: 'ಪ್ರಸ್ತುತ ಬಿಬಿಎಂಪಿ ಎ-ಖಾತಾ ಪತ್ರ', badge: 'ಸಕ್ರಿಯ ತೆರಿಗೆ ದಾಖಲೆ', description: 'ಸುಲಭವಾಗಿ ದಾನ ಪಡೆದವರ ಹೆಸರಿಗೆ ಖಾತಾ ಬದಲಾವಣೆ ಮಾಡಲು ದಾನ ನೀಡುವವರ ಹೆಸರಿನಲ್ಲಿರುವ ಇತ್ತೀಚಿನ ಖಾತಾ.' },
        g3: { name: 'ಇತ್ತೀಚಿನ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿ ರಶೀದಿ', badge: 'ತೆರಿಗೆ ನವೀಕರಣ', description: 'ದಾನ ಪತ್ರ ಬರೆಯುವ ಮೊದಲು ಎಲ್ಲಾ ತೆರಿಗೆ ಬಾಕಿಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಪಾವತಿಸಿರಬೇಕು.' },
        g4: { name: 'ಕುಟುಂಬ ವೃಕ್ಷ ಪ್ರಮಾಣಪತ್ರ (Vamshavruksha)', badge: 'ರಕ್ತ ಸಂಬಂಧದ ಪುರಾವೆ', description: 'ರಕ್ತ ಸಂಬಂಧಿಗಳ ನಡುವೆ ದಾನ ಪತ್ರ ನೋಂದಾಯಿಸಿದರೆ ಸರ್ಕಾರ ಮುದ್ರೆ ಶುಲ್ಕವನ್ನು ಅತ್ಯಂತ ಕಡಿಮೆ ನಿಗದಿಪಡಿಸುತ್ತದೆ (ಉದಾಹರಣೆಗೆ ಕೇವಲ ₹೫,೦೦೦).' }
      }
    },
    tracker: {
      badge: 'ಕಾವೇರಿ ೨.೦ ಮತ್ತು ಬಿಬಿಎಂಪಿ ನೇರ ಟ್ರ್ಯಾಕಿಂಗ್',
      title: 'ನಿಮ್ಮ ಆಸ್ತಿ ನೋಂದಣಿ ಪತ್ರಗಳ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ',
      subtitle: 'ನಾವು ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆಯನ್ನು ನಂಬುತ್ತೇವೆ. ನಿಮ್ಮ ಆಸ್ತಿ ದಾಖಲೆ ಸಿದ್ಧತೆ, ಬಿಬಿಎಂಪಿ ಸಮನ್ವಯ ಅಥವಾ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ತಿಳಿಯಲು ನಿಮ್ಮ ಟ್ರ್ಯಾಕಿಂಗ್ ಕೋಡ್ ನಮೂದಿಸಿ.',
      enterCodeLabel: 'ನಿಮ್ಮ ಸೇವಾ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆಯನ್ನು (Tracking Code) ನಮೂದಿಸಿ',
      placeholder: 'ಉದಾ: BLR-REG-3041 ಅಥವಾ BLR-KHA-8492',
      checkStatusBtn: 'ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
      checkingRegisters: 'ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
      trySampleLabel: 'ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆಗಳನ್ನು ಬಳಸಿ ನೋಡಿ:',
      reference: 'ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ',
      registryNode: 'ಕಾವೇರಿ ನೋಂದಣಿ ವ್ಯವಸ್ಥೆ',
      currentStatus: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ',
      primaryApplicant: 'ಅರ್ಜಿದಾರರ ಹೆಸರು',
      propertyLocation: 'ಆಸ್ತಿ ಇರುವ ವಿಳಾಸ',
      workflowTitle: 'ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆಯ ಹಂತಗಳು',
      remarksLabel: '[ವಿಶೇಷ ಸೂಚನೆ]:',
      sample1: 'BLR-REG-3041 (ಇಂದಿರಾನಗರ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿ)',
      sample2: 'BLR-KHA-8492 (ಬೆಳ್ಳಂದೂರು ಬಿಬಿಎಂಪಿ ಖಾತಾ)'
    },
    faq: {
      badge: 'ಪ್ರಶ್ನೋತ್ತರಗಳು',
      title: 'ಬೆಂಗಳೂರು ರಿಯಲ್ ಎಸ್ಟೇಟ್‌ನ ಸಾಮಾನ್ಯ ಗೊಂದಲಗಳು',
      subtitle: 'ಸ್ಥಳೀಯ ಆಸ್ತಿ ದಾಖಲೆಗಳು, ಬಿಬಿಎಂಪಿ ವರ್ಗಾವಣೆಗಳು ಮತ್ತು ಕಾವೇರಿ ೨.೦ ನಿಯಮಗಳ ಬಗ್ಗೆ ಅಧಿಕೃತ ಕಾನೂನು ಉತ್ತರಗಳು.',
      legalNoteTitle: 'ವಕೀಲರಿಂದ ಕಾನೂನು ಸಲಹೆ ಲಭ್ಯವಿದೆ',
      legalNoteDesc: 'ಸಂಕೀರ್ಣ ಜಮೀನು ವಿವಾದಗಳು, ಕುಟುಂಬ ಭಾಗವಹಿಸುವಿಕೆ ಪತ್ರಗಳು ಅಥವಾ ಕಾವೇರಿ ೨.೦ ಮೌಲ್ಯಮಾಪನ ದೋಷಗಳ ಬಗ್ಗೆ ವೈಯಕ್ತಿಕ ಸಲಹೆ ಬೇಕೇ? ನಮ್ಮ ಪಾಲುದಾರ ಬೆಂಗಳೂರು ವಕೀಲರ ತಂಡದೊಂದಿಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ.',
      items: [
        { q: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಎ ಖಾತಾ ಮತ್ತು ಬಿ ಖಾತಾ ನಡುವಿನ ನಿಖರ ವ್ಯತ್ಯಾಸವೇನು?', a: 'ಎ ಖಾತಾ ಎನ್ನುವುದು ನಗರಸಭೆಯ ಕಟ್ಟಡ ನಿಯಮಾವಳಿಗಳಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಹೊಂದಿಕೆಯಾಗುವ, ಬಿಡಿಎ/ಬಿಬಿಎಂಪಿ ಅನುಮೋದಿತ ನಕ್ಷೆ ಹೊಂದಿರುವ ಸಂಪೂರ್ಣ ಕಾನೂನುಬದ್ಧ ಆಸ್ತಿಗಳ ದಾಖಲೆಯಾಗಿದೆ. ಬಿ ಖಾತಾ ಎನ್ನುವುದು ಕಟ್ಟಡ ನಿಯಮಗಳ ಉಲ್ಲಂಘನೆ ಅಥವಾ ಅನಧಿಕೃತ ಲೇಔಟ್‌ಗಳಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಆಸ್ತಿಗಳ ಕಂದಾಯ ದಾಖಲೆಯಾಗಿದೆ. ಬಿ ಖಾತಾ ಆಸ್ತಿಗಳಿಗೆ ಬ್ಯಾಂಕುಗಳಿಂದ ಸುಲಭವಾಗಿ ಹೋಮ್ ಲೋನ್‌ಗಳು ಸಿಗುವುದಿಲ್ಲ ಮತ್ತು ಹೊಸ ಕಟ್ಟಡ ಪರವಾನಗಿ ಸಿಗುವುದಿಲ್ಲ.' },
        { q: 'ಕಾವೇರಿ ೨.೦ ಎಂದರೇನು ಮತ್ತು ಬೆಂಗಳೂರು ಆಸ್ತಿ ನೋಂದಣಿಗೆ ಇದು ಯಾಕೆ ಕಡ್ಡಾಯ?', a: 'ಕಾವೇರಿ ೨.೦ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಆಸ್ತಿ ನೋಂದಣಿಯ ಅತ್ಯಾಧುನಿಕ ಡಿಜಿಟಲ್ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ. ಇದು ಮುದ್ರೆ ಶುಲ್ಕದ ಆನ್‌ಲೈನ್ ಮುಂಗಡ ಪಾವತಿ, ನೋಂದಣಿ ಸಮಯದ ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ ಮತ್ತು ನೇರ ಆಧಾರ್ ಬಯೋಮೆಟ್ರಿಕ್ ಸಂಪರ್ಕವನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ. ಇದರಿಂದ ನಕಲಿ ನೋಂದಣಿಗಳನ್ನು ತಡೆಯಬಹುದು ಮತ್ತು ಆಸ್ತಿ ವಿವರಗಳು ತಕ್ಷಣವೇ ಸರ್ಕಾರಿ ಸರ್ವರ್‌ನಲ್ಲಿ ದಾಖಲಾಗುತ್ತವೆ.' },
        { q: 'ಬೆಂಗಳೂರು ಆಸ್ತಿಯ ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯವನ್ನು (Guidance Value) ಹೇಗೆ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ?', a: 'ಮಾರ್ಗಸೂಚಿ ಮೌಲ್ಯ ಎನ್ನುವುದು ಕರ್ನಾಟಕ ಸರ್ಕಾರವು ಬೆಂಗಳೂರಿನ ಪ್ರತಿಯೊಂದು ರಸ್ತೆ ಮತ್ತು ಬಡಾವಣೆಗಳಿಗೆ ನಿಗದಿಪಡಿಸುವ ಕನಿಷ್ಠ ಖರೀದಿ ದರವಾಗಿದೆ. ಇದು ಕಾಲಕಾಲಕ್ಕೆ ನವೀಕರಿಸಲ್ಪಡುತ್ತದೆ ಮತ್ತು ಸೌಲಭ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಬದಲಾಗುತ್ತದೆ (ಉದಾಹರಣೆಗೆ ಲಿಫ್ಟ್ ಇರುವ ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಳಿಗೆ ೧೦% ಹೆಚ್ಚಿನ ಮಾರ್ಗಸೂಚಿ ಇರುತ್ತದೆ). ಈ ಮೌಲ್ಯ ಅಥವಾ ನಿಮ್ಮ ಖರೀದಿ ಮೌಲ್ಯ ಇವೆರಡರಲ್ಲಿ ಯಾವುದು ಹೆಚ್ಚೋ ಅದರ ಮೇಲೆಯೇ ಮುದ್ರೆ ಶುಲ್ಕ ಪಾವತಿಸಬೇಕು.' },
        { q: 'ಕಳೆದ ೩೦ ವರ್ಷಗಳ ಸರಣಿ ಮದರ್ ಡೀಡ್ ಯಾಕೆ ಅತ್ಯಗತ್ಯವಾಗಿ ಬೇಕು?', a: 'ಮದರ್ ಡೀಡ್ (ಮೂಲ ಪತ್ರ) ಪ್ರಸ್ತುತ ಮಾರಾಟದ ಮುನ್ನ ಆಸ್ತಿಯು ಹೇಗೆ ಹರಿದುಬಂದಿದೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ. ಬೆಂಗಳೂರಿನ ಲೇಔಟ್‌ಗಳು ಕೃಷಿ ಭೂಮಿಯಿಂದ ಪರಿವರ್ತನೆಯಾಗಿರುವುದರಿಂದ, ಯಾವುದೇ ಹಳೆಯ ಕುಟುಂಬ ಸದಸ್ಯರು ಅಥವಾ ಬ್ಯಾಂಕುಗಳು ಆಸ್ತಿಯ ಮೇಲೆ ಹಕ್ಕು ಸಾಧಿಸಿಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಬ್ಯಾಂಕ್ ಮತ್ತು ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಗಳು ೩೦ ವರ್ಷಗಳ ನಿರಂತರ ದಾಖಲೆಯನ್ನು ಕೇಳುತ್ತವೆ.' }
      ]
    },
    booking: {
      badge: 'ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸುವುದು',
      title: 'ದಾಖಲೆ ಪರಿಶೀಲನಾ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ',
      subtitle: 'ನಮ್ಮ ಹಿರಿಯ ಆಸ್ತಿ ದಾಖಲಾತಿ ತಂಡದಿಂದ ನೇರ ದೂರವಾಣಿ ಕರೆ ಸಮಾಲೋಚನೆ ಪಡೆಯಿರಿ. ನಾವು ನಿಮ್ಮ ಆಸ್ತಿ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ನಿಖರ ನೋಂದಣಿ ವೆಚ್ಚಗಳನ್ನು ಲೆಕ್ಕಹಾಕುತ್ತೇವೆ.',
      formTitle: 'ಕರೆ ಸಮಯ ನಿಗದಿಪಡಿಸಿ',
      formDesc: 'ತಜ್ಞರ ಕರೆಯನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆಸ್ತಿ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ',
      fieldFullName: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು',
      fieldPhone: 'ಫೋನ್ / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      fieldEmail: 'ಇಮೇಲ್ ವಿಳಾಸ (ಐಚ್ಛಿಕ)',
      fieldLocality: 'ಬೆಂಗಳೂರಿನ ಪ್ರದೇಶ / ವಾರ್ಡ್',
      fieldPropertyType: 'ಆಸ್ತಿಯ ವಿಭಾಗ',
      fieldServiceType: 'ಅಗತ್ಯವಿರುವ ಸೇವೆ',
      fieldDate: 'ಕರೆ ಮಾಡಲು ಅನುಕೂಲಕರ ದಿನಾಂಕ',
      fieldNotes: 'ನಿಮ್ಮ ಆಸ್ತಿ ಪತ್ರಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ (ಐಚ್ಛಿಕ)',
      fieldNotesPlaceholder: 'ನಿಮ್ಮ ಬಳಿ ಮದರ್ ಡೀಡ್, ಇ-ಖಾತಾ ಇದೆಯೇ ಅಥವಾ ಹೊಸ ಪ್ರತಿಗಳು ಬೇಕೇ ಎಂದು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
      submitting: 'ಸಮಯ ಕಾಯ್ದಿರಿಸಲಾಗುತ್ತಿದೆ...',
      submitBtn: 'ಉಚಿತ ಕರೆ ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ',
      successTitle: 'ಸಮಾಲೋಚನೆ ನಿಗದಿಯಾಗಿದೆ!',
      successDesc: 'ನಿಮ್ಮ ಬೆಂಗಳೂರು ಆಸ್ತಿ ದಾಖಲಾತಿ ತಜ್ಞರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮ ಫೈಲ್ ಪರಿಶೀಲಿಸಿ ನಿಮಗೆ ಕರೆ ಮಾಡಲಿದ್ದಾರೆ.',
      refId: 'ನಿಮ್ಮ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ (File ID)',
      syncTitle: 'ನೇರ ಸಮಾಲೋಚನೆ ಸಂಪರ್ಕ',
      syncDesc: 'ನಿಮ್ಮ ಆಸ್ತಿಯ ವಿವರಗಳನ್ನು ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನೇರವಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ನಮ್ಮ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ:',
      sendWhatsApp: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ',
      callSupport: 'ಕರೆ ಮಾಡಿ: +91 63663 10992',
      resetForm: 'ಮತ್ತೊಂದು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನಿಗದಿಪಡಿಸಿ'
    },
    trust: {
      title: 'ನಿಖರ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಆಸ್ತಿ ತಪಾಸಣೆ',
      subtitle: 'ನಿಮ್ಮ ಆಸ್ತಿ ಹೂಡಿಕೆಗೆ ಕವಚ',
      badge: 'ಬೆಂಗಳೂರು ಪ್ರಾಪರ್ಟಿ ಡ್ಯೂ ಡಿಲಿಜೆನ್ಸ್ ವಿಭಾಗ',
      p1: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಸ್ತಿ ಖರೀದಿಸುವುದು ಒಂದು ದೊಡ್ಡ ಆರ್ಥಿಕ ಹೂಡಿಕೆಯಾಗಿದೆ. ನಿಮ್ಮ ಕಷ್ಟದ ಗಳಿಕೆಯನ್ನು ನಕಲಿ ದಾಖಲೆಗಳು, ಅಕ್ರಮ ಲೇಔಟ್‌ಗಳು ಮತ್ತು ಹಳೆಯ ಮಾಲೀಕರ ವಿವಾದಗಳಿಂದ ರಕ್ಷಿಸುವುದೇ ನಮ್ಮ ಪ್ರಮುಖ ಗುರಿಯಾಗಿದೆ. ನಿಮ್ಮ ಆಸ್ತಿಯು ೧೦೦% ವಿವಾದಮುಕ್ತವಾಗಿರಲು ನಾವು ಸಂಪೂರ್ಣ ಪರಿಶೀಲನೆಯನ್ನು ನಡೆಸುತ್ತೇವೆ.',
      p2: 'ಸ್ಥಳೀಯ ಬಿಬಿಎಂಪಿ ವಾರ್ಡ್ ಕಚೇರಿಗಳು ಮತ್ತು ಉಪ-ನೋಂದಣಾಧಿಕಾರಿಗಳ ಕಚೇರಿಯೊಂದಿಗೆ ನೇರವಾಗಿ ವ್ಯವಹರಿಸಿ, ಯಾವುದೇ ತೊಂದರೆಯಿಲ್ಲದೆ ನಿಮ್ಮ ದಾಖಲೆಗಳು ಮತ್ತು ಇ-ಖಾತಾ ನವೀಕರಣಗಳನ್ನು ಮಾಡಿಕೊಡುತ್ತೇವೆ.',
      block1Title: 'ಸಂಪೂರ್ಣ ದಾಖಲಾತಿ ಆಡಿಟ್',
      block1Desc: 'ಕಳೆದ ೩೦ ವರ್ಷಗಳ ಮೂಲ ಮದರ್ ಡೀಡ್, ಕ್ರಯ ಪತ್ರಗಳು ಮತ್ತು ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರಗಳ ಕಟ್ಟುನಿಟ್ಟಿನ ಪರಿಶೀಲನೆ.',
      block2Title: 'ಸ್ಥಳೀಯ ಕಚೇರಿಗಳ ಸಮನ್ವಯ',
      block2Desc: 'ಬಿಬಿಎಂಪಿ ಇ-ಖಾತಾ ವರ್ಗಾವಣೆ, ಆಸ್ತಿ ತೆರಿಗೆ ನವೀಕರಣಗಳು ಮತ್ತು ಸಕಾಲ ಅರ್ಜಿಗಳ ನೇರ ಹಾಗೂ ಕ್ಲೀನ್ ಸಲ್ಲಿಕೆ ಪ್ರಕ್ರಿಯೆ.'
    }
  }
};
