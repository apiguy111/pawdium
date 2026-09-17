import { Camera, Check, ChevronDown, Info, Lightbulb, Loader2, PawPrint, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PET_TYPES, type Pet, type PetType } from "@/types";
import { createPetApi, createBidApi } from "@/lib/api";
import { ConfirmRankDialog } from "./ConfirmRankDialog";
import { uploadPetImage } from "@/lib/imagekit";

export const COUNTRIES = [
  { name: "Afghanistan", code: "AF", flag: "🇦🇫" },
  { name: "Albania", code: "AL", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", flag: "🇦🇩" },
  { name: "Angola", code: "AO", flag: "🇦🇴" },
  { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬" },
  { name: "Argentina", code: "AR", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", flag: "🇦🇲" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿" },

  { name: "Bahamas", code: "BS", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
  { name: "Barbados", code: "BB", flag: "🇧🇧" },
  { name: "Belarus", code: "BY", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", flag: "🇧🇮" },

  { name: "Cabo Verde", code: "CV", flag: "🇨🇻" },
  { name: "Cambodia", code: "KH", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", flag: "🇨🇲" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Central African Republic", code: "CF", flag: "🇨🇫" },
  { name: "Chad", code: "TD", flag: "🇹🇩" },
  { name: "Chile", code: "CL", flag: "🇨🇱" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", flag: "🇨🇴" },
  { name: "Comoros", code: "KM", flag: "🇰🇲" },
  { name: "Congo, Democratic Republic of the", code: "CD", flag: "🇨🇩" },
  { name: "Congo, Republic of the", code: "CG", flag: "🇨🇬" },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷" },
  { name: "Côte d'Ivoire", code: "CI", flag: "🇨🇮" },
  { name: "Croatia", code: "HR", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", flag: "🇨🇾" },
  { name: "Czechia", code: "CZ", flag: "🇨🇿" },

  { name: "Denmark", code: "DK", flag: "🇩🇰" },
  { name: "Djibouti", code: "DJ", flag: "🇩🇯" },
  { name: "Dominica", code: "DM", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "DO", flag: "🇩🇴" },

  { name: "Ecuador", code: "EC", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶" },
  { name: "Eritrea", code: "ER", flag: "🇪🇷" },
  { name: "Estonia", code: "EE", flag: "🇪🇪" },
  { name: "Eswatini", code: "SZ", flag: "🇸🇿" },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹" },

  { name: "Fiji", code: "FJ", flag: "🇫🇯" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "France", code: "FR", flag: "🇫🇷" },

  { name: "Gabon", code: "GA", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", flag: "🇬🇲" },
  { name: "Georgia", code: "GE", flag: "🇬🇪" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", flag: "🇬🇭" },
  { name: "Greece", code: "GR", flag: "🇬🇷" },
  { name: "Grenada", code: "GD", flag: "🇬🇩" },
  { name: "Guatemala", code: "GT", flag: "🇬🇹" },
  { name: "Guinea", code: "GN", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼" },
  { name: "Guyana", code: "GY", flag: "🇬🇾" },

  { name: "Haiti", code: "HT", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", flag: "🇭🇳" },
  { name: "Hungary", code: "HU", flag: "🇭🇺" },

  { name: "Iceland", code: "IS", flag: "🇮🇸" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩" },
  { name: "Iran", code: "IR", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
  { name: "Israel", code: "IL", flag: "🇮🇱" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },

  { name: "Jamaica", code: "JM", flag: "🇯🇲" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", flag: "🇯🇴" },

  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", flag: "🇰🇪" },
  { name: "Kiribati", code: "KI", flag: "🇰🇮" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬" },

  { name: "Laos", code: "LA", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", flag: "🇱🇧" },
  { name: "Lesotho", code: "LS", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", flag: "🇱🇷" },
  { name: "Libya", code: "LY", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺" },

  { name: "Madagascar", code: "MG", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", flag: "🇲🇻" },
  { name: "Mali", code: "ML", flag: "🇲🇱" },
  { name: "Malta", code: "MT", flag: "🇲🇹" },
  { name: "Marshall Islands", code: "MH", flag: "🇲🇭" },
  { name: "Mauritania", code: "MR", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Micronesia", code: "FM", flag: "🇫🇲" },
  { name: "Moldova", code: "MD", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", flag: "🇲🇲" },

  { name: "Namibia", code: "NA", flag: "🇳🇦" },
  { name: "Nauru", code: "NR", flag: "🇳🇷" },
  { name: "Nepal", code: "NP", flag: "🇳🇵" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", flag: "🇳🇮" },
  { name: "Niger", code: "NE", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬" },
  { name: "North Korea", code: "KP", flag: "🇰🇵" },
  { name: "North Macedonia", code: "MK", flag: "🇲🇰" },
  { name: "Norway", code: "NO", flag: "🇳🇴" },

  { name: "Oman", code: "OM", flag: "🇴🇲" },

  { name: "Pakistan", code: "PK", flag: "🇵🇰" },
  { name: "Palau", code: "PW", flag: "🇵🇼" },
  { name: "Palestine", code: "PS", flag: "🇵🇸" },
  { name: "Panama", code: "PA", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬" },
  { name: "Paraguay", code: "PY", flag: "🇵🇾" },
  { name: "Peru", code: "PE", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", flag: "🇵🇭" },
  { name: "Poland", code: "PL", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },

  { name: "Qatar", code: "QA", flag: "🇶🇦" },

  { name: "Romania", code: "RO", flag: "🇷🇴" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", flag: "🇷🇼" },

  { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳" },
  { name: "Saint Lucia", code: "LC", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨" },
  { name: "Samoa", code: "WS", flag: "🇼🇸" },
  { name: "San Marino", code: "SM", flag: "🇸🇲" },
  { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", flag: "🇷🇸" },
  { name: "Seychelles", code: "SC", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", flag: "🇸🇱" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", flag: "🇸🇮" },
  { name: "Solomon Islands", code: "SB", flag: "🇸🇧" },
  { name: "Somalia", code: "SO", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "South Sudan", code: "SS", flag: "🇸🇸" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", flag: "🇸🇩" },
  { name: "Suriname", code: "SR", flag: "🇸🇷" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Syria", code: "SY", flag: "🇸🇾" },

  { name: "Tajikistan", code: "TJ", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", flag: "🇹🇭" },
  { name: "Timor-Leste", code: "TL", flag: "🇹🇱" },
  { name: "Togo", code: "TG", flag: "🇹🇬" },
  { name: "Tonga", code: "TO", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹" },
  { name: "Tunisia", code: "TN", flag: "🇹TN" },
  { name: "Türkiye", code: "TR", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", flag: "🇹🇲" },
  { name: "Tuvalu", code: "TV", flag: "🇹🇻" },

  { name: "Uganda", code: "UG", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Uruguay", code: "UY", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿" },

  { name: "Vanuatu", code: "VU", flag: "🇻🇺" },
  { name: "Vatican City", code: "VA", flag: "🇻🇦" },
  { name: "Venezuela", code: "VE", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳" },

  { name: "Yemen", code: "YE", flag: "🇾🇪" },

  { name: "Zambia", code: "ZM", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼" },
];

const labelCls = "mb-0.5 block text-xs font-semibold";
const fieldCls =
  "w-full rounded-md border border-border bg-card px-2.5 py-1.5 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary cursor-pointer";

export function PetSubmissionForm({
  onSubmit,
  claimPrice,
  pets = [],
}: {
  onSubmit: (pet: Pet) => void;
  claimPrice: number;
  pets?: Pet[];
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const defaultCountry = COUNTRIES.find((c) => c.name === "India") || COUNTRIES[0]!;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedType, setSelectedType] = useState<string>("Dogs");
  const [about, setAbout] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown open states
  const [countryOpen, setCountryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFile = async (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const imageUrl = await uploadPetImage(
        file,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      // Save ImageKit URL
      setPhoto(imageUrl);

      console.log("ImageKit URL:", imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);

      alert(
        "Failed to upload image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Form validity check (requires image and all fields filled)
  const isFormValid = Boolean(
    photo &&
    name.trim() &&
    owner.trim() &&
    breed.trim() &&
    selectedType &&
    city.trim() &&
    about.trim() &&
    !isUploading
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    const newPet: Pet = {
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: name.trim(),
      tagline: "",
      description: about.trim() || "Just joined the spotlight and ready to shine.",
      owner: owner.trim(),
      breed: breed.trim(),
      type: selectedType as PetType,
      city: city.trim(),
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
      image: photo ?? "",
      bid: claimPrice,
      activity: "Active just now",
      engagement: "0 views",
      views: 1,
      isNew: true,
    };

    // Try full stack backend creation
    try {
      const petRes = await createPetApi({
        petName: newPet.name,
        ownerName: newPet.owner,
        petType: newPet.type,
        breed: newPet.breed,
        country: newPet.country,
        city: newPet.city,
        about: newPet.description,
        imageUrl: newPet.image,
        currentBid: 0,
      });

      if (petRes.success && petRes.data?._id) {
        const bidRes = await createBidApi(petRes.data._id, claimPrice);
        if (bidRes.success && bidRes.data?.checkoutUrl) {
          window.location.href = bidRes.data.checkoutUrl;
          return;
        } else {
          alert(`Checkout error: ${bidRes.message || "Failed to generate payment session"}`);
          setIsSubmitting(false);
          return;
        }
      } else {
        alert(`Failed to save pet: ${petRes.message || "Please check details and try again"}`);
        setIsSubmitting(false);
        return;
      }
    } catch (err: any) {
      console.error("Backend submit error:", err);
      alert(`Submission error: ${err.message || "Could not reach the server"}`);
      setIsSubmitting(false);
      return;
    }

    onSubmit(newPet);
    setIsSubmitting(false);
    setConfirmOpen(false);
    setPhoto(null);
    setName("");
    setOwner("");
    setBreed("");
    setCity("");
    setSelectedType("Dogs");
    setAbout("");
  };

  const filteredTypes = PET_TYPES.filter((t) =>
    t.toLowerCase().includes(typeSearch.toLowerCase())
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="surface-card px-4 py-3">
        <div className="mb-2 flex items-center gap-1.5">
          <PawPrint className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Add Your Pet</h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-[116px_1fr]">
          <div className="flex flex-col items-center">
            <span className="mb-1 text-xs font-semibold">Pet Photo</span>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative flex h-[88px] w-[88px] flex-col items-center justify-center gap-0.5 overflow-hidden rounded-full border-2 border-dashed border-primary/35 bg-primary-soft/25 text-center transition-all hover:border-primary/60"
            >
              {photo ? (
                <img src={photo} alt="Pet preview" className="h-full w-full object-cover" />
              ) : (
                <>
                  <Camera className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">Upload</span>
                  <span className="px-3 text-[10px] leading-tight text-muted-foreground">
                    JPG, PNG up to 5MB
                  </span>
                </>
              )}

              {/* Canva-style Animated Progress Overlay Bar */}
              {isUploading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-black/65 px-2 pb-2 backdrop-blur-[2px] animate-in fade-in duration-150">
                  <span className="mb-1 text-[10px] font-bold text-white tracking-wider">
                    {uploadProgress < 100 ? `${uploadProgress}%` : "Done!"}
                  </span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/30 p-[1px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-amber-400 transition-all duration-150 ease-out shadow-sm"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          <div>
            {/* Form Rows - 2 Rows Total */}
            <div className="flex flex-col gap-2.5">
              {/* Row 1: Pet Name, Owner Name, Country, City, Pet Type */}
              <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-5">
                <div>
                  <label className={labelCls} htmlFor="petName">
                    Pet Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="petName"
                    className={fieldCls}
                    placeholder="e.g. Milo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="ownerName">
                    Owner Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="ownerName"
                    className={fieldCls}
                    placeholder="e.g. Alex"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  />
                </div>

                {/* Country Selector */}
                <div className="relative" ref={countryDropdownRef}>
                  <label className={labelCls}>Country</label>
                  <button
                    type="button"
                    onClick={() => {
                      setCountryOpen((v) => !v);
                      setTypeOpen(false);
                    }}
                    className={`${fieldCls} flex items-center justify-between gap-1.5 text-left`}
                  >
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <span className="text-base leading-none">{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${countryOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {countryOpen && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-pop animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex flex-col gap-0.5">
                        {COUNTRIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setCountryOpen(false);
                            }}
                            className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted ${selectedCountry.code === c.code
                              ? "bg-primary-soft text-primary font-bold"
                              : ""
                              }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-base leading-none">{c.flag}</span>
                              <span>{c.name}</span>
                            </span>
                            {selectedCountry.code === c.code && (
                              <Check className="h-3.5 w-3.5 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelCls} htmlFor="city">
                    City <span className="text-primary">*</span>
                  </label>
                  <input
                    id="city"
                    className={fieldCls}
                    placeholder="e.g. Hyderabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* Pet Type Custom Dropdown */}
                <div className="relative" ref={typeDropdownRef}>
                  <label className={labelCls}>Pet Type</label>
                  <button
                    type="button"
                    onClick={() => {
                      setTypeOpen((v) => !v);
                      setCountryOpen(false);
                    }}
                    className={`${fieldCls} flex items-center justify-between gap-1.5 text-left`}
                  >
                    <span className="inline-flex items-center gap-1.5 truncate font-medium">
                      <PawPrint className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{selectedType}</span>
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${typeOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {typeOpen && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-pop animate-in fade-in zoom-in-95 duration-150 flex flex-col">
                      <div className="relative px-1 pb-1.5 border-b border-border mb-1">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search pet types..."
                          value={typeSearch}
                          onChange={(e) => setTypeSearch(e.target.value)}
                          className="w-full rounded-md bg-muted/60 pl-8 pr-2 py-1 text-xs outline-none focus:bg-muted"
                        />
                      </div>

                      <div className="overflow-y-auto flex-1 flex flex-col gap-0.5">
                        {filteredTypes.length === 0 ? (
                          <p className="p-3 text-center text-xs text-muted-foreground">
                            No matching pet type
                          </p>
                        ) : (
                          filteredTypes.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => {
                                setSelectedType(t);
                                setTypeOpen(false);
                                setTypeSearch("");
                              }}
                              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-muted ${selectedType === t
                                ? "bg-primary-soft text-primary font-bold"
                                : "text-foreground"
                                }`}
                            >
                              <span>{t}</span>
                              {selectedType === t && (
                                <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                              )}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Breed Field (~25% aligned with Pet Name) & Bio Field (remaining width) */}
              <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-1">
                  <label className={labelCls} htmlFor="breed">
                    Breed <span className="text-primary">*</span>
                  </label>
                  <input
                    id="breed"
                    className={fieldCls}
                    placeholder="e.g. Golden Retriever..."
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>

                <div className="lg:col-span-4">
                  <label className={labelCls} htmlFor="about">
                    About Your Pet (Bio) <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="about"
                      type="text"
                      maxLength={150}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="Tell us something cute or special about your pet..."
                      className={`${fieldCls} pr-14`}
                    />
                    <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">
                      {about.length}/150
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5 text-gold" />
            Tip: Upload photo and fill all fields to submit!
          </p>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            title={!isFormValid ? "Please upload an image and fill all fields" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-bold transition-all ${isFormValid && !isSubmitting
              ? "bg-primary text-primary-foreground shadow-pop hover:opacity-90 cursor-pointer"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed border border-border"
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Submitting...
              </>
            ) : (
              <>
                <PawPrint className="h-4.5 w-4.5" />
                Submit &amp; Enter Leaderboard
              </>
            )}
          </button>

          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            How it works?
          </p>
        </div>
      </form>

      {/* Calculate predicted rank based on current leaderboard bids */}
      {(() => {
        // Rank is 1 + number of pets with higher bid
        const predictedRank =
          pets.filter((p) => (p.bid || 0) >= claimPrice).length + 1;

        return (
          <ConfirmRankDialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleConfirm}
            petName={name.trim()}
            category={`${selectedType} · Spotlight leaderboard`}
            rank={predictedRank}
            price={claimPrice}
            isSubmitting={isSubmitting}
          />
        );
      })()}
    </>
  );
}
