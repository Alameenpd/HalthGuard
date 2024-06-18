
  import { 
            BsPersonVideo
   } from "react-icons/bs";
   import { PiChalkboardTeacher } from "react-icons/pi";
 
  import { RiPhoneCameraLine } from "react-icons/ri"
  import { GrEmergency } from "react-icons/gr";

const features = [
  {
    Icon: RiPhoneCameraLine,
    title: "Snap & Dectect: Instant injury identification",
    description: "Use your device's camera to detect injuries and get instant feedback. HealthGuard AI's advanced image analysis technology identifies the type and severity of the injury, providing a solid foundation for effective first aid."
  },
  {
    Icon: BsPersonVideo,
    title: "Visual Guidance: Step-by-Step First Aid Videos",
    description:
      "Watch video tutorials that demonstrate first aid procedures, providing a clear understanding of each step. HealthGuard AI's video integration ensures you're well-equipped to handle any situation.",
  },
  {
    Icon:  PiChalkboardTeacher,
    title: "Voice Guidance: AI-Powered Verbal Instructions",
    description:
      "Receive clear, concise verbal instructions from HealthGuard AI's advanced algorithms. Get guidance on first aid procedures, ensuring you stay focused and confident in emergency situations.",
  },
 
  {
    Icon: GrEmergency,
    title: "Emergency Alert: Quick Access to Help",
    description:
      "In severe situations, HealthGuard AI enables rapid access to emergency services. With a single tap, connect with professionals who can provide critical assistance, ensuring timely support when it matters most.",
  },

];

export default features;
