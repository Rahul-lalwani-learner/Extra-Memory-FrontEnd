
import { SideBar } from "./components/ui/Sidebar"
import { AudioIcon } from "./icons/audioIcon"
import { HashIcon } from "./icons/hashIcon"
import { ImageIcon } from "./icons/imageIcon"
import { LinkIcon } from "./icons/linkIcon"
import { StorageIcon } from "./icons/storageIcon"
import { TextIcon } from "./icons/textIcon"
import { VideoIcon } from "./icons/videoIcon"
import { useMediaQuery } from "react-responsive"
import { useState, type ReactElement } from "react"
import { useEffect, useRef } from "react";
import { ShareBrain } from "./components/ui/BrainShare"
import { AddContent } from "./components/ui/AddContent"
import Login from "./components/login"
import SignUp from "./components/signUp"
import { Profile } from "./components/ui/Profile"
import { ContentSection } from "./components/ContentSection"
import { ProfileDropDown } from "./components/ui/ProfileDropDown"
import { SharedBrain } from "./components/SharedBrain"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AllContentIcon } from "./icons/AllContentIcon"
import LandingPage from "./components/LandingPage"
import { ContentViewer } from "./components/ui/ContentViewer"
import { useNotification } from "./hooks/useNotification"
import { NotificationContainer } from "./components/ui/NotificationContainer"


function App() {
  // return <Main></Main>
  // return <SignUp></SignUp>
  // return <Login></Login>
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/dashboard" element={<Main></Main>}></Route>
      <Route path="/brain/:userId" element={<SharedBrain></SharedBrain>}></Route>
    </Routes>
  </BrowserRouter>
}

function Main(){
  const isMd = useMediaQuery({ minWidth: "48rem" }); // md breakpoint
  const isSm = useMediaQuery({ minWidth: "40rem" });
  const isXs = useMediaQuery({
    minWidth: "30rem"
  });

  const [contentType, setContentType] = useState<string>("all");
  // Set initial sidebar state based on window width (open if >= md, closed if < md)
  const [sideBarOpen, setsideBarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768; // 48rem = 768px
    }
    return true;
  });
  const { showNotification, removeNotification, notifications } = useNotification();

  // Automatically open sidebar only when screen size increases to md and user hasn't manually toggled it
  // Use useEffect to avoid running on every render and to prevent interfering with manual toggling

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (isMd) {
      setsideBarOpen(true);
    } else {
      setsideBarOpen(false);
    }
  }, [isMd]);
  
  
  const [overLayMode, setOverLayMode] = useState('default');
  const [contentRefreshKey, setContentRefreshKey] = useState(0);
  const [selectedContent, setSelectedContent] = useState<{id: string, title: string, type: 'text' | 'video' | 'image' | 'audio' | 'link', tags: string[], content: string} | null>(null);

  const refreshContent = () => {
    setContentRefreshKey(prev => prev + 1);
  };

  const handleCardClick = (cardData: {id: string, title: string, type: 'text' | 'video' | 'image' | 'audio' | 'link', tags: string[], content: string}) => {
    setSelectedContent(cardData);
    setOverLayMode('contentViewer');
  };

  const handleCloseContentViewer = () => {
    setSelectedContent(null);
    setOverLayMode('default');
  };

  const overLayElements: Record<string, ReactElement |string > = {
    'brainShare': <ShareBrain setOverLayMode={setOverLayMode} showNotification={showNotification}/>,
    'addContent': <AddContent setOverLayMode={setOverLayMode} onContentAdded={refreshContent} showNotification={showNotification}/>,
    'contentViewer': selectedContent ? (
      <ContentViewer 
        id={selectedContent.id}
        title={selectedContent.title}
        type={selectedContent.type}
        tags={selectedContent.tags}
        content={selectedContent.content}
        onClose={handleCloseContentViewer}
      />
    ) : '',
    'default': ''
  }
  
  const [showProfileDropDown, setshowProfileDropDown] = useState(false);
  

  return <div className={`flex ${overLayMode!='default'? 'overflow-hidden max-h-screen max-w-screen': ''}`}>
    {overLayElements[overLayMode]}
    <div
      className={`sticky top-0 overflow-scroll left-0 transition-all duration-150 bg-white min-h-screen h-full ${sideBarOpen ? `${isMd ? '' : 'fixed top-0 left-0'} sm:w-xs w-3xs z-40` : 'w-16 z-30'}`}
      style={{
      overflowY: isMd? 'hidden' :sideBarOpen ? 'auto' : 'hidden',
      overflowX: 'hidden',
      }}
    >
      <SideBar
      title="Extra Memory"
      logo={<StorageIcon size="size-8" />}
      listItems={{
        "All Content": <AllContentIcon/>,
        "Documents": <TextIcon />,
        "Videos": <VideoIcon />,
        "Images": <ImageIcon />,
        "Links": <LinkIcon />,
        "Audios": <AudioIcon />,
        "Tags": <HashIcon />
      }}
      size={sideBarOpen ? 'lg' : 'sm'}
      isMd={isMd}
      isOpen={sideBarOpen}
      setSideBarStatus={setsideBarOpen}
      setContentType = {setContentType}
      >
        <Profile 
          size={sideBarOpen ? 'lg' : 'sm'} 
          showLogout = {showProfileDropDown}
          setShowLogout = {setshowProfileDropDown}
        />
      </SideBar>
    </div>
    <div className="transition-all delay-150 w-full min-h-screen h-full bg-gray-100 overflow-hidden relative">

      {/* Logout dropdown positioned at bottom-left of main content area */}
      {showProfileDropDown && (
        <ProfileDropDown 
          setshowProfileDropDown={setshowProfileDropDown}
          showNotification={showNotification}
        />
      )}
      
      
      <ContentSection 
        isSm={isSm} 
        isXs={isXs} 
        setOverLayMode={setOverLayMode}
        refreshKey={contentRefreshKey}
        contentType = {contentType}
        onCardClick={handleCardClick}
        showNotification={showNotification}
      />
      
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications}
        onNotificationComplete={removeNotification}
        onNotificationClose={removeNotification}
      />
    </div>
  </div>
  
}

export default App
