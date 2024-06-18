/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7cmQ8jipWl8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function DashBoard() {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-900 text-white w-64 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <CrossIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">AI Healthcare</h1>
          </div>
          <nav className="space-y-2">
            <Link href="#" className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded" prefetch={false}>
              <WebcamIcon className="w-5 h-5" />
              <span>Chat</span>
            </Link>
            <Link href="#" className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded" prefetch={false}>
              <VideoIcon className="w-5 h-5" />
              <span>Video</span>
            </Link>
            <Link href="#" className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded" prefetch={false}>
              <HospitalIcon className="w-5 h-5" />
              <span>Health Info</span>
            </Link>
            <Link href="#" className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded" prefetch={false}>
              <AmbulanceIcon className="w-5 h-5" />
              <span>Emergencies</span>
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <Link href="#" className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded" prefetch={false}>
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded" prefetch={false}>
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-950 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Chat with AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[400px] overflow-y-auto">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg max-w-[75%]">
                    <p>Hello, how can I assist you today?</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4 ml-auto">
                  <div className="bg-blue-500 text-white p-4 rounded-lg max-w-[75%]">
                    <p>I'm having some trouble with my blood pressure. Can you help me?</p>
                  </div>
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg max-w-[75%]">
                    <p>
                      I'm sorry to hear you're having trouble with your blood pressure. Let me take a look at your
                      health data and provide some recommendations.
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-4 flex gap-2">
                <Input type="text" placeholder="Type your message..." className="flex-1" />
                <Button type="submit">Send</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Watch AI in Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <div />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Healthcare Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <img src="/placeholder.svg" width="400" height="300" alt="Healthcare Illustration" className="mx-auto" />
              <div className="prose mt-4">
                <p>
                  Our AI healthcare assistant is designed to provide personalized health recommendations, monitor vital
                  signs, and assist with emergency situations. With advanced medical knowledge and real-time data
                  analysis, we're here to help you stay healthy and safe.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AmbulanceIcon className="w-6 h-6" />
                    <h3 className="text-lg font-medium">Emergency Contacts</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quickly access your emergency contacts and call for help.
                  </p>
                  <Button variant="outline" className="mt-4">
                    View Contacts
                  </Button>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AmbulanceIcon className="w-6 h-6" />
                    <h3 className="text-lg font-medium">First Aid</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get step-by-step instructions for common first aid situations.
                  </p>
                  <Button variant="outline" className="mt-4">
                    View First Aid
                  </Button>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerIcon className="w-6 h-6" />
                    <h3 className="text-lg font-medium">Vital Sign Monitoring</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor your vital signs and receive alerts for any abnormalities.
                  </p>
                  <Button variant="outline" className="mt-4">
                    View Vital Signs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function AmbulanceIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 10H6" />
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
      <path d="M8 8v4" />
      <path d="M9 18h6" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}


function CrossIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  )
}


function HospitalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  )
}


function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function ThermometerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}


function WebcamIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  )
}