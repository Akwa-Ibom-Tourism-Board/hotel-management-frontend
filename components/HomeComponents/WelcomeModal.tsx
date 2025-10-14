import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./HomeDailogue";
import Button from "@/components/HomeComponents/HomeButton";

interface WelcomeModalProps {
  open: boolean;
  onContinue: () => void;
  onClose: () => void;
}

const WelcomeModal = ({ open, onContinue, onClose }: WelcomeModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader className="space-y-6">
        <DialogTitle className="text-2xl sm:text-3xl text-center md:text-4xl text-[#2a2523] font-bold">
          Welcome to Akwa Ibom State Hotel and Tourism Board Portal
        </DialogTitle>
        <DialogDescription className="text-base text-center sm:text-lg md:text-xl text-[#78716e] leading-relaxed text-muted-foreground">
          As part of its mandate to register and regulate all hospitality
          establishments, the Akwa Ibom State Hotel and Tourism Board seeks to
          capture all information of these establishments. It is mandatory that
          all hospitality establishments log on to this portal and register.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center md:justify-end pt-4">
        <Button onClick={onContinue} background="#e77818">
          Continue to Registration
        </Button>
      </div>
    </Dialog>
  );
};

export default WelcomeModal;
