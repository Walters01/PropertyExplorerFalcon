# PropertyExplorer
o Setup instructions
  1. npm install
  2. npx expo start
  3. Download expo on playstore and scan the qr or run it in your android emulator

     
o Explanation of your app structure and tech choices

  App Structure:
    /assets               → Static files like images
    /src
   ├── /screens              → Contains all screen components like Home, Favorites, Profile, etc.
   ├── /components           → Reusable UI components like SearchBar, PropertyCard, Modal, etc.
   ├── /navigation           → Handles navigation stacks and tab navigators (TabNavigator, AppNavigator)
   ├── /context              → Global state/context (e.g., ThemeContext for dark/light mode)
   └── /utils                → Optional: helper functions, constants, etc.
  
  Tech choices:
  | Tech/Library                                     | Purpose                                 | Why Chosen                                    |
  | ------------------------------------------------ | --------------------------------------- | --------------------------------------------- |
  | **React Native**                                 | Core framework for building mobile apps | Cross-platform with rich ecosystem            |
  | **React Navigation**                             | Navigation (stack & tabs)               | Most stable and popular RN navigation library |
  | **AsyncStorage**                                 | Persistent local storage                | For saving bookmarks, theme preferences       |
  | **Dark/Light Mode (via Context API)**            | UI theme toggle                         | Simple and effective global theme state       |
  | **Custom Components (e.g. PropertyCard, Modal)** | Reusability and consistency             | Keeps UI clean and modular                    |
  | **Feather Icons / FontAwesome**                  | Icons for UI                            | Lightweight and customizable vector icons     |
  | **Slider**                                       | Price filter UI                         | Good UX for selecting price range             |
  | **TypeScript**                                   | Type safety                             | Helps prevent bugs and improves DX            |

o Notes on any limitations or assumptions

o Features completed and anything you’d improve with more time
