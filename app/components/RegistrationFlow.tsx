/* eslint-disable @typescript-eslint/no-unused-vars */
// components/home/RegistrationFlow.tsx
import { useState } from "react";
import Button from "./HomeButton";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Card from "../../components/Card";
import { Select } from "../../components/Select";
import { Dialog, DialogHeader, DialogTitle } from "./HomeDailogue";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PopUpButton from "./PopUpButton";

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
  type:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "select"
    | "checkbox-group"
    | "radio";
  options?: string[];
  hasOtherOption?: boolean;
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
    { id: "entity_type", label: "What are you?", type: "select" },
    { id: "business_name", label: "What is your business name?", type: "text" },
    {
      id: "registration_number",
      label: "Business phone number",
      type: "text",
    },
    { id: "address", label: "Full Business Address", type: "text" },
    {
      id: "local_government",
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
    { id: "website", label: "Business website", type: "text" },
    { id: "year_established", label: "Year of establishment", type: "number" },
    { id: "contact_name", label: "Contact name", type: "text" },
    { id: "phone", label: "Contact phone number", type: "tel" },
    { id: "email", label: "Contact email address", type: "email" },
  ],
  hotel: [
    { id: "room_count", label: "How many rooms do you have?", type: "number" },
    { id: "bed_spaces", label: "Number of bed spaces", type: "number" },
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
    { id: "seating_capacity", label: "Seating capacity", type: "number" },
    {
      id: "service_types",
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
      id: "service_types",
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
      id: "service_types",
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
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<Record<string, string | string[]>>(
    {}
  );
  const [entityType, setEntityType] = useState<EntityType | string>("");
  const [isEntityModalOpen, setIsEntityModalOpen] = useState(false);
  const [isRadioModalOpen, setIsRadioModalOpen] = useState(false);
  const [otherInputs, setOtherInputs] = useState<Record<string, string>>({});
  const [tempRadioSelection, setTempRadioSelection] = useState<string>("");

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

  const allQuestions = [...questions.common, ...getEntityQuestions(entityType)];
  const currentQuestion = allQuestions[currentStep];

  const handleNext = () => {
    if (currentStep < allQuestions.length - 1) {
      setDirection("right");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
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
    if (currentQuestion.id === "entity_type") {
      setEntityType(value as EntityType);
      setCurrentStep(0); // Reset to first question when entity type changes
    }
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
    setFormData({ ...formData, entity_type: value });
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

  const canProceed =
    currentQuestion.type === "checkbox-group"
      ? (formData[currentQuestion.id] as string[])?.length > 0 ||
        otherInputs[currentQuestion.id]?.trim().length > 0
      : typeof formData[currentQuestion.id] === "string"
      ? (formData[currentQuestion.id] as string)?.trim().length > 0
      : false;

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
            <Label
              htmlFor={currentQuestion.id}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#2a2523] font-extrabold block"
            >
              {currentQuestion.label}
            </Label>

            {/* Entity type (custom modal) */}
            {currentQuestion.id === "entity_type" ? (
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
              <Input
                id={currentQuestion.id}
                type={currentQuestion.type}
                value={(formData[currentQuestion.id] as string) || ""}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full h-14 text-lg border-2 border-input bg-white"
                placeholder="Type your answer here..."
                autoFocus
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center md:gap-0 gap-6 justify-between flex-col md:flex-row mt-12">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              background="#00563b"
            >
              <div className="flex items-center w-[100%] justify-center">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </div>
            </Button>
            <div
              className=""
              style={{
                display:
                  currentStep === allQuestions.length - 1 ? "none" : "block",
              }}
            >
              <Button
                onClick={handleNext}
                disabled={
                  !canProceed || currentStep === allQuestions.length - 1
                }
                background="#00563b"
              >
                <div className="flex items-center w-[100%] justify-center">
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </Button>
            </div>
            {currentStep === allQuestions.length - 1 && canProceed && (
              <div className="text-center animate-fade-in">
                <Button background="#e77818">Submit Registration</Button>
              </div>
            )}
          </div>
          {/* Submit Button */}
        </Card.Card>
      </div>
    </div>
  );
};

export default RegistrationFlow;