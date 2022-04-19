import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlbumPage from "./pages/albumPage";
import AlbumsPage from "./pages/albumsPage";
import Layout from "./components/layout/layout";
import HomePage from "./pages/homePage/homePage";
import AboutPage from "./pages/aboutPage/aboutPage";
import ContactsPage from "./pages/contactsPage/contactsPage";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route to='/home' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="albums" element={<AlbumsPage />} />
              <Route path="albums/:id" element={<AlbumPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contacts" element={<ContactsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}


