import {
  Dialog,
  DialogHeader,
  DialogTitle,
} from "./HomeComponents/HomeDailogue";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  onRegisterAnother: () => void;
};

const BusinessSuccessModal = ({ open, onClose, onRegisterAnother }: Props) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timeout = setTimeout(() => setShowConfetti(false), 7000);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="relative overflow-hidden text-center p-8 rounded-lg shadow-xl border-2 border-[#e77818]">
        {showConfetti && (
          <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
            <Image
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazd6bDR6bnRobjlpemp2MjRyeGtkMHZlOXdiMDF5Y2VrZTFrcWg3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tOZ42Mg6pbTUPHW/giphy.gif"
              alt="Celebration"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <div className="relative z-10 space-y-6">
          <CheckCircle className="mx-auto w-16 h-16 text-[#e77818]" />
          <DialogHeader>
            <DialogTitle className="text-3xl text-center font-extrabold text-[#2a2523]">
              Hospitality Establishment Registered Successfully!!
            </DialogTitle>
          </DialogHeader>
          <p className="text-lg text-[#78716e]">
            Thank you for registering with us. Further information will be
            communicated
          </p>

          {/* <Button onClick={onClose} background="#00563b" width="100%">
            Go to Dashboard
          </Button> */}

          <div className="mt-4 text-sm">
            <button
              onClick={onRegisterAnother}
              className="text-[#e77818] font-semibold hover:underline"
            >
              + Register another business
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BusinessSuccessModal;
