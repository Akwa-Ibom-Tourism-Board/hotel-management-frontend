import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./HomeDailogue";
import Button from "@/components/HomeComponents/HomeButton";
import Image from "next/image";

interface WelcomeModalProps {
  open: boolean;
  onContinue: () => void;
  onClose: () => void;
}

const WelcomeModal = ({ open, onContinue, onClose }: WelcomeModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader className="space-y-6">
        <section className="flex justify-between relative w-full h-16 md:h-24 mb-4">
          <div>
            <Image
              src="/akwa-ibom-logo-main.png"
              alt="Celebration"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <DialogTitle className="text-xl sm:text-2xl text-center md:text-3xl text-[#2a2523] font-bold">
            Welcome to Akwa Ibom State Hotel and Tourism Board Portal
          </DialogTitle>
          <div>
            <Image
              src="/arise-logo-main.png"
              alt="Celebration"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </section>
        <DialogDescription className="text-base text-center sm:text-md md:text-lg text-[#78716e] leading-relaxed text-muted-foreground">
          As part of its mandate to register and regulate all hospitality
          establishments, the Akwa Ibom State Hotel and Tourism Board seeks to
          capture all information of these establishments. <br /> It is
          mandatory that all hospitality establishments operating a business in
          Akwa Ibom State log on to this portal and register their hospitality
          establishment/business.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center md:justify-end pt-4">
        <Button onClick={onContinue} background="#e77818" height="50px">
          Continue to Registration
        </Button>
      </div>
    </Dialog>
  );
};

export default WelcomeModal;
