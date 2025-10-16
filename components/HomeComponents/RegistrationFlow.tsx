/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/home/RegistrationFlow.tsx
import { useState } from "react";
import Button from "./HomeButton";
import Input from "../Input";
import Label from "../Label";
import Card from "../Card";
import { Select } from "../Select";
import { Dialog, DialogHeader, DialogTitle } from "./HomeDailogue";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import PopUpButton from "./PopUpButton";
import OTPVerification from "@/components/OtpVerification";
import BusinessSuccessModal from "@/components/BusinessSuccessModal";
import { useRegisterEstablishments } from "@/services/registrationApi/mutation";
import { useAlert } from "next-alert";

type EntityType =
  | "hotel"
  | "bar"
  | "restaurant"
  | "lounge"
  | "tour_operator"
  | "travel_agent"
  | "hospitality_org"
  | "other";

type Question = {
  id: string;
  label: string;
  subLabel?: string;
  type:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "select"
    | "checkbox-group"
    | "radio"
    | "boolean";
  options?: string[];
  hasOtherOption?: boolean;
  validation?: (value: any) => string | null;
  required?: boolean;
};

// Validation utilities
const validations = {
  email: (value: string): string | null => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
    // Check for common typos in domain
    const domain = value.split("@")[1];
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];
    const typos: Record<string, string> = {
      "gmial.com": "gmail.com",
      "gmai.com": "gmail.com",
      "yahooo.com": "yahoo.com",
      "hotmial.com": "hotmail.com",
    };
    if (typos[domain]) {
      return `Did you mean ${value.split("@")[0]}@${typos[domain]}?`;
    }
    return null;
  },

  nigerianPhone: (value: string): string | null => {
    if (!value) return "Phone number is required";
    // Remove spaces, dashes, and plus signs
    const cleaned = value.replace(/[\s\-+]/g, "");

    // Nigerian numbers: starts with 0 (11 digits) or 234 (13 digits)
    const localFormat = /^0[789][01]\d{8}$/; // 0803, 0701, etc.
    const intlFormat = /^234[789][01]\d{8}$/; // 234803, etc.

    if (!localFormat.test(cleaned) && !intlFormat.test(cleaned)) {
      return "Invalid Nigerian phone number. Format: 0803XXXXXXX or 234803XXXXXXX";
    }
    return null;
  },

  required: (value: any): string | null => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return "This field is required";
    }
    return null;
  },

  year: (value: string): string | null => {
    if (!value) return "Year is required";
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear) {
      return `Year must be between 1900 and ${currentYear}`;
    }
    return null;
  },

  number: (value: string): string | null => {
    if (!value) return "This field is required";
    if (isNaN(Number(value)) || Number(value) <= 0) {
      return "Please enter a valid positive number";
    }
    return null;
  },
};

const entityLabels: Record<EntityType, string> = {
  hotel: "Hotel",
  bar: "Bar",
  restaurant: "Restaurant",
  lounge: "Lounge",
  tour_operator: "Tour Operator",
  travel_agent: "Travel Agent",
  hospitality_org: "Hospitality Organization",
  other: "Other",
};

const questions: {
  common: Question[];
  hotel: Question[];
  restaurant: Question[];
  lounge: Question[];
  bar: Question[];
} = {
  common: [
    { id: "entityType", label: "Hospitality Business Type", type: "select" },
    {
      id: "businessName",
      label: "What is your business name?",
      type: "text",
      validation: validations.required,
    },
    {
      id: "businessPhoneNumber",
      label: "Business phone number",
      subLabel:
        "(Phone number will be verified. Once verified, you cannot change it again on this form please)",
      type: "number",
      validation: validations.nigerianPhone,
    },
    {
      id: "address",
      label: "Full Business Address",
      type: "text",
      validation: validations.required,
    },
    {
      id: "localGovernment",
      label: "Local government where business is located",
      type: "radio",
      options: [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat Enin",
        "Nsit Atai",
        "Nsit Ibom",
        "Nsit Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong/Oruko",
        "Uyo",
      ],
    },
    {
      id: "hasWebsite",
      label: "Do you have a business website?",
      type: "boolean",
    },
    {
      id: "website",
      label: "Business website URL",
      type: "text",
      validation: (value: string) => {
        if (!value) return "Website URL is required";
        const urlRegex =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test(value)) return "Please enter a valid URL";
        return null;
      },
    },
    {
      id: "yearEstablished",
      label: "Year of establishment",
      type: "number",
      validation: validations.year,
    },
    {
      id: "contactName",
      label: "Contact name",
      type: "text",
      validation: validations.required,
    },
    {
      id: "contactPhoneNumber",
      label: "Contact phone number",
      type: "tel",
      validation: validations.nigerianPhone,
    },
    {
      id: "contactEmail",
      label: "Contact email address",
      type: "email",
      validation: validations.email,
    },
    {
      id: "businessEmail",
      label: "Business email address",
      subLabel:
        "(This email will be used for official communication. You can use contact email or personal email if there is no separate business email)",
      type: "email",
      validation: validations.email,
    },
  ],
  hotel: [
    {
      id: "roomCount",
      label: "How many rooms do you have?",
      type: "number",
      validation: validations.number,
    },
    {
      id: "bedSpaces",
      label: "Number of bed spaces",
      type: "number",
      validation: validations.number,
    },
    {
      id: "facilities",
      label: "Select all facilities that are available",
      type: "checkbox-group",
      options: [
        "Board room",
        "Conference hall",
        "Swimming pool",
        "Basketball court",
        "Table tennis court",
        "Lawn tennis court",
        "Internet cyber cafe",
      ],
      hasOtherOption: true,
    },
  ],
  restaurant: [
    {
      id: "seatingCapacity",
      label: "Seating capacity",
      type: "number",
      validation: validations.number,
    },
    {
      id: "serviceTypes",
      label: "Select all types of services you offer",
      type: "checkbox-group",
      options: [
        "Continental dishes",
        "Local/Nigerian dishes",
        "Inter-continental dishes",
        "Chinese",
        "Indian",
        "Italian",
        "Bakery/Pastries",
        "Fast food",
        "Seafood",
        "Grill/BBQ",
        "Cafe",
      ],
      hasOtherOption: true,
    },
  ],
  lounge: [
    {
      id: "serviceTypes",
      label: "Select all types of services you offer",
      type: "checkbox-group",
      options: [
        "Continental dishes",
        "Local dishes",
        "Inter-continental dishes",
      ],
      hasOtherOption: true,
    },
  ],
  bar: [
    {
      id: "serviceTypes",
      label: "Select all types of services you offer",
      type: "checkbox-group",
      options: [
        "Continental dishes",
        "Local dishes",
        "Inter-continental dishes",
      ],
      hasOtherOption: true,
    },
  ],
};

const RegistrationFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<
    Record<string, string | string[] | boolean>
  >({});
  const {
    mutateAsync: registerEstablishments,
    isPending: registerEstablishmentLoading,
  } = useRegisterEstablishments();
  const { addAlert } = useAlert();
  const [entityType, setEntityType] = useState<EntityType | string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otherInputs, setOtherInputs] = useState<Record<string, string>>({});
  const [isEntityModalOpen, setIsEntityModalOpen] = useState(false);
  const [isRadioModalOpen, setIsRadioModalOpen] = useState(false);
  const [tempRadioSelection, setTempRadioSelection] = useState<string>("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // Get entity-specific questions based on type
  const getEntityQuestions = (entity: string): Question[] => {
    switch (entity) {
      case "hotel":
        return questions.hotel;
      case "restaurant":
        return questions.restaurant;
      case "lounge":
        return questions.lounge;
      case "bar":
        return questions.bar;
      default:
        return [];
    }
  };

  const processOtherInputs = (
    formData: Record<string, string | string[] | boolean>,
    otherInputs: Record<string, string>
  ): Record<string, string | string[] | boolean> => {
    const processed = { ...formData };

    // Iterate through otherInputs to merge them with formData
    Object.entries(otherInputs).forEach(([questionId, otherValue]) => {
      if (otherValue && otherValue.trim()) {
        const currentValues = (processed[questionId] as string[]) || [];
        // Add the other value to the array if it's not empty
        processed[questionId] = [...currentValues, otherValue.trim()];
      }
    });

    return processed;
  };

  const getFilteredQuestions = (phoneVerified = isPhoneVerified) => {
    let allQuestions = [...questions.common, ...getEntityQuestions(entityType)];

    // Filter out website question if user doesn't have a website
    if (!formData.hasWebsite) {
      allQuestions = allQuestions.filter((q) => q.id !== "website");
    }

    if (phoneVerified) {
      allQuestions = allQuestions.filter((q) => q.id !== "businessPhoneNumber");
    }

    return allQuestions;
  };

  const allQuestions = getFilteredQuestions();
  const currentQuestion = allQuestions[currentStep];

  const validateField = (question: Question, value: any): string | null => {
    if (question.validation) {
      return question.validation(value);
    }
    return null;
  };

  const handleNext = () => {
    // Validate current field
    const error = validateField(currentQuestion, formData[currentQuestion.id]);
    if (error) {
      setErrors({ ...errors, [currentQuestion.id]: error });
      return;
    }

    getFilteredQuestions();

    // Check if phone verification is needed
    if (currentQuestion.id === "businessPhoneNumber" && !isPhoneVerified) {
      setShowOTPDialog(true);
      return;
    }

    if (currentStep < allQuestions.length - 1) {
      setDirection("right");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
        setErrors({ ...errors, [currentQuestion.id]: "" });
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection("left");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleInputChange = (value: string | string[]) => {
    setFormData({ ...formData, [currentQuestion.id]: value });
    setErrors({ ...errors, [currentQuestion.id]: "" });

    if (currentQuestion.id === "entityType") {
      setEntityType(value as EntityType);
      setCurrentStep(0);
    }
  };

  const handleBooleanChoice = (choice: "yes" | "no") => {
    const booleanValue = choice === "yes";
    const updatedFormData = { ...formData, [currentQuestion.id]: booleanValue };

    if (
      currentQuestion.id === "hasWebsite" &&
      !booleanValue &&
      formData.website
    ) {
      delete updatedFormData.website;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [currentQuestion.id]: "" });

    setTimeout(() => {
      if (currentStep < allQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentValues = (formData[currentQuestion.id] as string[]) || [];
    const newValues = checked
      ? [...currentValues, option]
      : currentValues.filter((v) => v !== option);
    handleInputChange(newValues);
  };

  const handleOtherInputChange = (value: string) => {
    setOtherInputs({ ...otherInputs, [currentQuestion.id]: value });
  };

  const handleEntitySelect = (value: string) => {
    setFormData({ ...formData, entityType: value });
    setEntityType(value as EntityType);
    setIsEntityModalOpen(false);
  };

  const handleRadioSelect = (value: string) => {
    setTempRadioSelection(value);
  };

  const handleRadioConfirm = () => {
    if (tempRadioSelection) {
      setFormData({ ...formData, [currentQuestion.id]: tempRadioSelection });
      setIsRadioModalOpen(false);
      setTempRadioSelection("");
    }
  };

  const handleOTPVerified = () => {
    setShowOTPDialog(false);
    setIsPhoneVerified(true);

    setTimeout(() => {
      const updatedQuestions = getFilteredQuestions(true);
      const phoneIndex = questions.common.findIndex(
        (q) => q.id === "businessPhoneNumber"
      );
      const nextQuestionId = questions.common[phoneIndex + 1]?.id;

      const nextIndex = updatedQuestions.findIndex(
        (q) => q.id === nextQuestionId
      );

      if (nextIndex !== -1) {
        setDirection("right");
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep(nextIndex);
          setIsAnimating(false);
        }, 300);
      }
    }, 100);
  };
  const handleSubmit = async () => {
    const error = validateField(currentQuestion, formData[currentQuestion.id]);
    if (error) {
      setErrors({ ...errors, [currentQuestion.id]: error });
      return;
    }

    const processedFormData = processOtherInputs(formData, otherInputs);

    const submissionData = {
      ...processedFormData,
      submittedAt: new Date().toISOString(),
      phoneVerified: isPhoneVerified,
    };

    try {
      await registerEstablishments(submissionData, {
        onSuccess: (data) => {
          addAlert(
            "Success!",
            "Registration successful! An email has been sent to the emails you provided. Please check your email for further information.",
            "success"
          );
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          console.error("Registration error:", error);
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "An error occurred during registration, please try again. If error persists, please contact admin.",
            "error"
          );
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      addAlert("Error", "Submission failed. Please try again. If error persists, please contact admin.", "error");
    }
  };

  const handleNewRegistration = () => {
    setShowSuccessModal(false);
    setFormData({});
    setOtherInputs({});
    setCurrentStep(0);
    setEntityType("");
    setIsPhoneVerified(false);
  };

  const canProceed = () => {
    if (currentQuestion.type === "checkbox-group") {
      return (
        (formData[currentQuestion.id] as string[])?.length > 0 ||
        otherInputs[currentQuestion.id]?.trim().length > 0
      );
    }
    if (currentQuestion.type === "boolean") {
      return formData[currentQuestion.id] !== undefined;
    }
    return formData[currentQuestion.id]?.toString().trim().length > 0;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-8 text-[#78716e]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-muted-foreground">
            Question {currentStep + 1} of {allQuestions.length}
          </span>
          <span className="text-sm text-[#e77818] font-bold text-primary">
            {Math.round(((currentStep + 1) / allQuestions.length) * 100)}%
            Complete
          </span>
        </div>
        <div className="w-full bg-[#f2f0ed] h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e77818] transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / allQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="relative bg-[#ffff] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg" />

        <Card.Card
          key={currentStep}
          className={`p-8 shadow-card border-border bg-card relative min-h-[400px] transition-all duration-500 ${
            isAnimating
              ? direction === "right"
                ? "animate-slide-out-left opacity-0"
                : "animate-slide-out-right opacity-0"
              : "animate-fade-in opacity-100"
          }`}
        >
          <div className="space-y-6">
            {currentQuestion.type === "boolean" && (
              <div
                className="flex items-center gap-4 mb-10 text-[#00563b] hover:text-[#e77818] hover:cursor-pointer font-medium"
                onClick={handlePrevious}
              >
                <ArrowLeft />{" "}
                <span className="font-bold">Previous Question</span>
              </div>
            )}
            <div>
              <Label
                htmlFor={currentQuestion.id}
                className="text-xl sm:text-2xl md:text-[28px] text-[#2a2523] font-extrabold block"
              >
                {currentQuestion.label}
              </Label>
              {currentQuestion?.subLabel && (
                <Label
                  htmlFor={currentQuestion.id}
                  className="text-lg text-red-500 font-extrabold block mt-1 mb-3 italic"
                >
                  {currentQuestion.subLabel}
                </Label>
              )}
            </div>

            {/* Entity type (custom modal) */}
            {currentQuestion.id === "entityType" ? (
              <>
                <PopUpButton onClick={() => setIsEntityModalOpen(true)}>
                  <div className="text-left text-sm sm:text-base md:text-lg lg:text-xl text-[#2a2523] p-2">
                    {formData[currentQuestion.id]
                      ? entityLabels[formData[currentQuestion.id] as EntityType]
                      : "Click to select your business type"}
                  </div>
                </PopUpButton>

                <Dialog
                  open={isEntityModalOpen}
                  onClose={() => setIsEntityModalOpen(false)}
                >
                  <div className="sm:max-w-[600px] bg-card">
                    <DialogHeader>
                      <DialogTitle className="text-[24px] text-[#2a2523]">
                        Select Your Business Type
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {Object.entries(entityLabels).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => handleEntitySelect(value)}
                          className="p-6 hover:cursor-pointer rounded-lg text-[#2a2523] border-[#e9e1d7] border-2 hover:text-[#e77818] hover:border-[#e77818] hover:bg-[#e77818]/10 transition-all text-left group"
                        >
                          <h3 className="text-lg font-semibold transition-colors">
                            {label}
                          </h3>
                        </button>
                      ))}
                    </div>
                  </div>
                </Dialog>
              </>
            ) : currentQuestion.type === "boolean" ? (
              <div className="flex gap-4">
                <Button
                  onClick={() => handleBooleanChoice("yes")}
                  background={
                    formData[currentQuestion.id] === "yes"
                      ? "#e77818"
                      : "#78716e"
                  }
                  width="100%"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleBooleanChoice("no")}
                  background={
                    formData[currentQuestion.id] === "no"
                      ? "#e77818"
                      : "#78716e"
                  }
                  width="100%"
                >
                  No
                </Button>
              </div>
            ) : currentQuestion.type === "radio" ? (
              <>
                <PopUpButton
                  onClick={() => {
                    setTempRadioSelection(
                      (formData[currentQuestion.id] as string) || ""
                    );
                    setIsRadioModalOpen(true);
                  }}
                >
                  <div className="text-left text-sm sm:text-base md:text-lg lg:text-xl text-[#2a2523] p-2">
                    {formData[currentQuestion.id]
                      ? formData[currentQuestion.id]
                      : "Click to select"}
                  </div>
                </PopUpButton>

                <Dialog
                  open={isRadioModalOpen}
                  onClose={() => {
                    setIsRadioModalOpen(false);
                    setTempRadioSelection("");
                  }}
                >
                  <div className="sm:max-w-[600px] bg-card max-h-[70vh]">
                    <DialogHeader>
                      <DialogTitle className="text-[24px] text-[#2a2523]">
                        {currentQuestion.label}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 mt-4 max-h-[50vh] overflow-y-auto px-2">
                      {currentQuestion.options?.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            tempRadioSelection === option
                              ? "border-[#e77818] bg-[#e77818]/10"
                              : "border-[#e9e1d7] hover:border-[#e77818] hover:bg-[#e77818]/5"
                          }`}
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option}
                            checked={tempRadioSelection === option}
                            onChange={(e) => handleRadioSelect(e.target.value)}
                            className="w-5 h-5 text-[#e77818] border-2 border-[#e9e1d7] focus:ring-[#e77818] cursor-pointer"
                          />
                          <span className="text-base text-[#2a2523]">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-center gap-10">
                      <Button
                        onClick={() => {
                          setIsRadioModalOpen(false);
                          setTempRadioSelection("");
                        }}
                        background="#78716e"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRadioConfirm}
                        disabled={!tempRadioSelection}
                        background="#e77818"
                      >
                        Confirm Selection
                      </Button>
                    </div>
                  </div>
                </Dialog>
              </>
            ) : currentQuestion.type === "checkbox-group" ? (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-[#e9e1d7] hover:border-[#e77818] hover:bg-[#e77818]/5 transition-all cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={(
                        (formData[currentQuestion.id] as string[]) || []
                      ).includes(option)}
                      onChange={(e) =>
                        handleCheckboxChange(option, e.target.checked)
                      }
                      className="w-5 h-5 rounded border-2 border-[#e9e1d7] text-[#e77818] focus:ring-[#e77818] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-base md:text-lg text-[#2a2523] group-hover:text-[#e77818] transition-colors">
                      {option}
                    </span>
                  </label>
                ))}

                {currentQuestion.hasOtherOption && (
                  <div className="mt-4">
                    <label className="flex items-start space-x-3 p-4 rounded-lg border-2 border-[#e9e1d7] hover:border-[#e77818] hover:bg-[#e77818]/5 transition-all">
                      <input
                        type="checkbox"
                        checked={!!otherInputs[currentQuestion.id]}
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setOtherInputs({
                              ...otherInputs,
                              [currentQuestion.id]: "",
                            });
                          }
                        }}
                        className="w-5 h-5 mt-1 rounded border-2 border-[#e9e1d7] text-[#e77818] focus:ring-[#e77818] focus:ring-offset-0 cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-base md:text-lg text-[#2a2523] block mb-2">
                          Other (please specify)
                        </span>
                        <Input
                          type="text"
                          value={otherInputs[currentQuestion.id] || ""}
                          onChange={(e) =>
                            handleOtherInputChange(e.target.value)
                          }
                          className="w-full h-12 text-base border-2 border-input bg-white"
                          placeholder="Please specify other options..."
                        />
                      </div>
                    </label>
                  </div>
                )}
              </div>
            ) : currentQuestion.type === "select" && currentQuestion.options ? (
              <Select
                value={(formData[currentQuestion.id] as string) || ""}
                onChange={(e) => handleInputChange(e.target.value)}
                options={currentQuestion.options.map((option) => ({
                  value: option,
                  label: `${option} Star${option !== "1" ? "s" : ""}`,
                }))}
                className="h-14 text-lg border-2 border-input focus:border-primary focus:ring-primary"
              />
            ) : (
              <div className="w-full">
                <Input
                  id={currentQuestion.id}
                  type={currentQuestion.type}
                  value={(formData[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full h-14 text-lg border-2 border-input bg-white"
                  placeholder="Type your answer here..."
                  autoFocus
                />
                {errors[currentQuestion.id] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[currentQuestion.id]}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center md:gap-0 gap-6 justify-between flex-col md:flex-row mt-12">
            {currentQuestion.type !== "boolean" && (
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0 || registerEstablishmentLoading}
                background="#00563b"
              >
                <div className="flex items-center w-[100%] justify-center">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </div>
              </Button>
            )}

            {currentStep === allQuestions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || registerEstablishmentLoading}
                background="#e77818"
              >
                {registerEstablishmentLoading
                  ? "Submitting..."
                  : "Submit Registration"}
              </Button>
            ) : (
              currentQuestion.type !== "boolean" && (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || registerEstablishmentLoading}
                  background="#00563b"
                >
                  <div className="flex items-center w-[100%] justify-center">
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </div>
                </Button>
              )
            )}
          </div>
        </Card.Card>
      </div>

      <Dialog open={showOTPDialog} onClose={() => setShowOTPDialog(false)}>
        <OTPVerification
          phoneNumber={formData.businessPhoneNumber as string}
          onVerified={handleOTPVerified}
          onCancel={() => setShowOTPDialog(false)}
        />
      </Dialog>

      <BusinessSuccessModal
        open={showSuccessModal}
        onClose={handleNewRegistration}
        onRegisterAnother={handleNewRegistration}
      />
    </div>
  );
};

export default RegistrationFlow;
