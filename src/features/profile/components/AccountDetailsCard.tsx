import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Button, FormField, toast } from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { updateProfile } from "../api";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^(0[789][01]\d{8}|234[789][01]\d{8})$/, "Enter a valid Nigerian phone number"),
});

type FormValues = z.infer<typeof schema>;

const formatDate = (iso?: string | null) => {
  if (!iso) return "Not available";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
};

export const AccountDetailsCard = () => {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const updated = await updateProfile(values);
      setUser(updated);
      toast.success("Your details have been updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update your details");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Your name and phone number can be updated here; your NIN and email stay fixed.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="National Identification Number (NIN)">
            <Input value={user?.nin ?? "Not available"} readOnly />
          </FormField>

          <FormField label="Email Address">
            <Input value={user?.email ?? ""} readOnly />
          </FormField>

          <FormField label="Date of Birth">
            <Input value={formatDate(user?.dateOfBirth)} readOnly />
          </FormField>

          <FormField label="First Name" required error={errors.firstName?.message}>
            <Input {...register("firstName")} />
          </FormField>

          <FormField label="Last Name" required error={errors.lastName?.message}>
            <Input {...register("lastName")} />
          </FormField>

          <FormField label="Phone Number" required error={errors.phoneNumber?.message}>
            <Input type="tel" {...register("phoneNumber")} />
          </FormField>

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
