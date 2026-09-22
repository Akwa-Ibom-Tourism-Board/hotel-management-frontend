import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Input, Button, FormField } from "@/shared/ui";

const schema = z.object({
  nin: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "Your NIN must be exactly 11 digits"),
});

export type NinFormValues = z.infer<typeof schema>;

interface NinLookupFormProps {
  onSubmit: (values: NinFormValues) => Promise<void> | void;
  defaultNin?: string;
}

export const NinLookupForm = ({ onSubmit, defaultNin }: NinLookupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NinFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nin: defaultNin ?? "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="National Identification Number (NIN)" required error={errors.nin?.message}>
        <Input
          inputMode="numeric"
          maxLength={11}
          placeholder="Enter your 11-digit NIN"
          {...register("nin")}
        />
      </FormField>

      <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
        {isSubmitting ? (
          "Verifying NIN..."
        ) : (
          <>
            Verify NIN <ArrowRight size={18} />
          </>
        )}
      </Button>
    </form>
  );
};
