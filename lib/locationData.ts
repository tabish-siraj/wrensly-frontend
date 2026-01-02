// Gender options
export const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
    { value: "other", label: "Other" },
];

// Country codes for phone numbers
export const COUNTRY_CODES = [
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+1", country: "CA", flag: "🇨🇦" },
    { code: "+44", country: "GB", flag: "🇬🇧" },
    { code: "+33", country: "FR", flag: "🇫🇷" },
    { code: "+49", country: "DE", flag: "🇩🇪" },
    { code: "+39", country: "IT", flag: "🇮🇹" },
    { code: "+34", country: "ES", flag: "🇪🇸" },
    { code: "+31", country: "NL", flag: "🇳🇱" },
    { code: "+41", country: "CH", flag: "🇨🇭" },
    { code: "+43", country: "AT", flag: "🇦🇹" },
    { code: "+32", country: "BE", flag: "🇧🇪" },
    { code: "+45", country: "DK", flag: "🇩🇰" },
    { code: "+46", country: "SE", flag: "🇸🇪" },
    { code: "+47", country: "NO", flag: "🇳🇴" },
    { code: "+358", country: "FI", flag: "🇫🇮" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+86", country: "CN", flag: "🇨🇳" },
    { code: "+81", country: "JP", flag: "🇯🇵" },
    { code: "+82", country: "KR", flag: "🇰🇷" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
    { code: "+64", country: "NZ", flag: "🇳🇿" },
    { code: "+55", country: "BR", flag: "🇧🇷" },
    { code: "+52", country: "MX", flag: "🇲🇽" },
    { code: "+54", country: "AR", flag: "🇦🇷" },
    { code: "+56", country: "CL", flag: "🇨🇱" },
    { code: "+57", country: "CO", flag: "🇨🇴" },
    { code: "+51", country: "PE", flag: "🇵🇪" },
    { code: "+58", country: "VE", flag: "🇻🇪" },
    { code: "+92", country: "PK", flag: "🇵🇰" },
    { code: "+880", country: "BD", flag: "🇧🇩" },
    { code: "+94", country: "LK", flag: "🇱🇰" },
    { code: "+977", country: "NP", flag: "🇳🇵" },
    { code: "+60", country: "MY", flag: "🇲🇾" },
    { code: "+65", country: "SG", flag: "🇸🇬" },
    { code: "+66", country: "TH", flag: "🇹🇭" },
    { code: "+84", country: "VN", flag: "🇻🇳" },
    { code: "+63", country: "PH", flag: "🇵🇭" },
    { code: "+62", country: "ID", flag: "🇮🇩" },
    { code: "+27", country: "ZA", flag: "🇿🇦" },
    { code: "+234", country: "NG", flag: "🇳🇬" },
    { code: "+254", country: "KE", flag: "🇰🇪" },
    { code: "+20", country: "EG", flag: "🇪🇬" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+966", country: "SA", flag: "🇸🇦" },
    { code: "+90", country: "TR", flag: "🇹🇷" },
    { code: "+7", country: "RU", flag: "🇷🇺" },
];

// Countries with their states/provinces and major cities
export const LOCATION_DATA = {
    "United States": {
        states: {
            "Alabama": ["Birmingham", "Montgomery", "Mobile", "Huntsville"],
            "Alaska": ["Anchorage", "Fairbanks", "Juneau"],
            "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler"],
            "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville"],
            "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Oakland"],
            "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
            "Connecticut": ["Hartford", "New Haven", "Stamford", "Waterbury"],
            "Delaware": ["Wilmington", "Dover", "Newark"],
            "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
            "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah"],
            "Hawaii": ["Honolulu", "Hilo", "Kailua-Kona"],
            "Idaho": ["Boise", "Nampa", "Meridian"],
            "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet"],
            "Indiana": ["Indianapolis", "Fort Wayne", "Evansville"],
            "Iowa": ["Des Moines", "Cedar Rapids", "Davenport"],
            "Kansas": ["Wichita", "Overland Park", "Kansas City"],
            "Kentucky": ["Louisville", "Lexington", "Bowling Green"],
            "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport"],
            "Maine": ["Portland", "Lewiston", "Bangor"],
            "Maryland": ["Baltimore", "Frederick", "Rockville"],
            "Massachusetts": ["Boston", "Worcester", "Springfield"],
            "Michigan": ["Detroit", "Grand Rapids", "Warren"],
            "Minnesota": ["Minneapolis", "Saint Paul", "Rochester"],
            "Mississippi": ["Jackson", "Gulfport", "Southaven"],
            "Missouri": ["Kansas City", "Saint Louis", "Springfield"],
            "Montana": ["Billings", "Missoula", "Great Falls"],
            "Nebraska": ["Omaha", "Lincoln", "Bellevue"],
            "Nevada": ["Las Vegas", "Henderson", "Reno"],
            "New Hampshire": ["Manchester", "Nashua", "Concord"],
            "New Jersey": ["Newark", "Jersey City", "Paterson"],
            "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho"],
            "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
            "North Carolina": ["Charlotte", "Raleigh", "Greensboro"],
            "North Dakota": ["Fargo", "Bismarck", "Grand Forks"],
            "Ohio": ["Columbus", "Cleveland", "Cincinnati"],
            "Oklahoma": ["Oklahoma City", "Tulsa", "Norman"],
            "Oregon": ["Portland", "Salem", "Eugene"],
            "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown"],
            "Rhode Island": ["Providence", "Warwick", "Cranston"],
            "South Carolina": ["Columbia", "Charleston", "North Charleston"],
            "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen"],
            "Tennessee": ["Nashville", "Memphis", "Knoxville"],
            "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
            "Utah": ["Salt Lake City", "West Valley City", "Provo"],
            "Vermont": ["Burlington", "South Burlington", "Rutland"],
            "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake"],
            "Washington": ["Seattle", "Spokane", "Tacoma"],
            "West Virginia": ["Charleston", "Huntington", "Morgantown"],
            "Wisconsin": ["Milwaukee", "Madison", "Green Bay"],
            "Wyoming": ["Cheyenne", "Casper", "Laramie"]
        }
    },
    "Canada": {
        states: {
            "Alberta": ["Calgary", "Edmonton", "Red Deer"],
            "British Columbia": ["Vancouver", "Victoria", "Surrey"],
            "Manitoba": ["Winnipeg", "Brandon", "Steinbach"],
            "New Brunswick": ["Saint John", "Moncton", "Fredericton"],
            "Newfoundland and Labrador": ["St. John's", "Corner Brook", "Mount Pearl"],
            "Northwest Territories": ["Yellowknife", "Hay River", "Inuvik"],
            "Nova Scotia": ["Halifax", "Sydney", "Dartmouth"],
            "Nunavut": ["Iqaluit", "Rankin Inlet", "Arviat"],
            "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
            "Prince Edward Island": ["Charlottetown", "Summerside", "Stratford"],
            "Quebec": ["Montreal", "Quebec City", "Laval"],
            "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert"],
            "Yukon": ["Whitehorse", "Dawson City", "Watson Lake"]
        }
    },
    "United Kingdom": {
        states: {
            "England": ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"],
            "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"],
            "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham"],
            "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newtownabbey"]
        }
    },
    "India": {
        states: {
            "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada"],
            "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
            "Bihar": ["Patna", "Gaya", "Bhagalpur"],
            "Delhi": ["New Delhi", "Delhi"],
            "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
            "Karnataka": ["Bangalore", "Mysore", "Hubli"],
            "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
            "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
            "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra"],
            "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
        }
    },
    "Pakistan": {
        states: {
            "Punjab": ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha", "Sheikhupura", "Jhang", "Gujrat", "Kasur", "Rahim Yar Khan", "Sahiwal", "Okara", "Wah Cantonment", "Dera Ghazi Khan", "Mirpur Khas", "Kamoke", "Mandi Bahauddin", "Jhelum", "Sadiqabad", "Khanewal", "Hafizabad", "Kohat", "Jacobabad", "Muzaffargarh", "Khanpur", "Gojra", "Bahawalnagar", "Muridke", "Pak Pattan", "Abottabad", "Talagang", "Toba Tek Singh", "Fateh Jang", "Depalpur"],
            "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas", "Jacobabad", "Shikarpur", "Khairpur", "Dadu", "Badin", "Thatta", "Sanghar", "Tando Allahyar", "Tando Adam", "Umerkot", "Matiari", "Ghotki", "Naushahro Feroze", "Kashmore", "Jamshoro", "Tharparkar"],
            "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Mingora", "Kohat", "Dera Ismail Khan", "Bannu", "Swabi", "Charsadda", "Nowshera", "Mansehra", "Abbottabad", "Karak", "Hangu", "Lakki Marwat", "Wazirabad", "Chitral", "Parachinar", "Landikotal", "Jamrud", "Miranshah", "Wana", "Razmak", "Spinkai", "Angoor Ada"],
            "Balochistan": ["Quetta", "Turbat", "Khuzdar", "Hub", "Chaman", "Zhob", "Gwadar", "Sibi", "Loralai", "Pishin", "Killa Abdullah", "Mastung", "Kalat", "Kharan", "Nushki", "Taftan", "Dalbandin", "Panjgur", "Dera Bugti", "Sui", "Ziarat", "Muslim Bagh"],
            "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza", "Ghanche", "Shigar", "Nagar", "Kharmang", "Rounddu", "Gahkuch", "Yasin", "Ishkoman", "Gupis", "Chitral", "Astore", "Diamer"],
            "Azad Jammu and Kashmir": ["Muzaffarabad", "Mirpur", "Rawalakot", "Palandri", "Kotli", "Bhimber", "Bagh", "Neelum", "Hattian", "Haveli", "Poonch", "Sudhanoti"],
            "Islamabad Capital Territory": ["Islamabad"]
        }
    },
    "Australia": {
        states: {
            "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
            "Victoria": ["Melbourne", "Geelong", "Ballarat"],
            "Queensland": ["Brisbane", "Gold Coast", "Townsville"],
            "Western Australia": ["Perth", "Fremantle", "Bunbury"],
            "South Australia": ["Adelaide", "Mount Gambier", "Whyalla"],
            "Tasmania": ["Hobart", "Launceston", "Devonport"],
            "Northern Territory": ["Darwin", "Alice Springs", "Katherine"],
            "Australian Capital Territory": ["Canberra"]
        }
    }
};

export const COUNTRIES = Object.keys(LOCATION_DATA);

export const getStatesForCountry = (country: string) => {
    const countryData = LOCATION_DATA[country as keyof typeof LOCATION_DATA];
    if (!countryData) return [];

    return Object.keys(countryData.states);
};

export const getCitiesForState = (country: string, state: string) => {
    const countryData = LOCATION_DATA[country as keyof typeof LOCATION_DATA];
    if (!countryData) return [];

    const statesData = countryData.states as Record<string, string[]>;
    return statesData[state] || [];
};