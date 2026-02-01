import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface UIContextState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  watchVideoId: string | null;
  setWatchVideoId: (id: string | null) => void;
  showCategoryPanel: boolean;
  setShowCategoryPanel: (show: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  authenticatedUser: any;
  setAuthenticatedUser: (user: any) => void;
  selectedVideo: any;
  setSelectedVideo: (video: any) => void;
  selectedMediaType: string;
  setSelectedMediaType: (mediaType: string) => void;
}

const UIContext = createContext<UIContextState | undefined>(undefined);

export const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [watchVideoId, setWatchVideoId] = useState<string | null>(null);
  const [showCategoryPanel, setShowCategoryPanel] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>("light");
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<string>("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <UIContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        closeSidebar,
        activeCategory,
        setActiveCategory,
        watchVideoId,
        setWatchVideoId,
        showCategoryPanel,
        setShowCategoryPanel,
        theme,
        setTheme,
        authenticatedUser,
        setAuthenticatedUser,
        selectedVideo,
        setSelectedVideo,
        selectedMediaType,
        setSelectedMediaType
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIContextProvider");
  }
  return context;
};

