import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { CopyIcon } from "../../icons/CopyIcon";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Overlay } from "./Overlay";
import { PopUpBox } from "./popUpBox";
import { StopIcon } from "../../icons/stopIcon";
import { BACKEND_URL } from "../../config";

export function ShareBrain({setOverLayMode}: {setOverLayMode: Dispatch<SetStateAction<string>>}){
    const shareLink = useRef(null);
    const [shareableLink, setShareableLink] = useState<string>("");
    const [isSharing, setIsSharing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const enableSharing = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please sign in to share your brain');
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to enable sharing');
            }

            const data = await response.json();
            // Convert backend URL to frontend URL
            const backendUrl = data.shareableLink;
            const userId = backendUrl.split('/').pop(); // Extract user ID from backend URL
            const frontendUrl = `${window.location.origin}/brain/${userId}`;
            
            setShareableLink(frontendUrl);
            setIsSharing(true);
            alert("Sharing enabled! Link is ready to copy.");
        } catch (error) {
            console.error('Error enabling sharing:', error);
            alert('Failed to enable sharing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const disableSharing = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please sign in');
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/brain/share`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to disable sharing');
            }

            setShareableLink("");
            setIsSharing(false);
            alert("Content sharing has been stopped");
        } catch (error) {
            console.error('Error disabling sharing:', error);
            alert('Failed to disable sharing. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return <>
        <Overlay visiblity="block"></Overlay>
        <PopUpBox>
            <div className="sm:w-sm w-3xs sm:px-4 px-2 pt-2 flex flex-col items-center">
              <div className="flex w-full justify-between items-center pb-4 "> 
                <div className="font-bold text-lg">{"Share Your Extra Memory"}</div>
                <div onClick={()=>{setOverLayMode('default')}} className="cursor-pointer hover:text-purple-600"><CrossIcon/></div>
              </div>
              <div className="mt-2 text-gray-400 text-sm">
                {"Share your entire collection of notes, documents,tweets, and videos with others. They'll be able to import your content into their own Second Brain."}
              </div>
              <div
              ref={shareLink}
              className="w-full bg-gray-300 rounded-md p-2 my-2 text-gray-400 break-all"
              >
              {shareableLink || "Click 'Start Sharing' to generate your shareable link"}
              </div>
              <div className="flex justify-around w-full">
                <Button
                variant="primary"
                size='md'
                text={isSharing ? "Copy Link" : "Start Sharing"}
                startIcon={<CopyIcon />}
                loading={loading}
                onClick={async () => {
                  if (isSharing && shareableLink) {
                    // If already sharing, copy the link
                    navigator.clipboard.writeText(shareableLink);
                    alert("Link Copied")
                  } else {
                    // Enable sharing first
                    await enableSharing();
                  }
                }}
                extraClass="sm:w-[40%] w-[48%] sm:text-sm text-xs"
              ></Button>
              <Button
                variant="secondary"
                size='md'
                text="Stop Sharing"
                startIcon={<StopIcon />}
                loading={loading}
                onClick={disableSharing}
                extraClass="sm:w-[40%] w-[48%] sm:text-sm text-xs"
              ></Button>
              </div>
            </div>
        </PopUpBox>
        </>
}