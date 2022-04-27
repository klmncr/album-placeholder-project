import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlbumPage from "../albumPage/albumPage";
import AlbumsPage from "../albumsPage/albumsPage";
import Layout from "../layout/layout";
import HomePage from "../homePage/homePage"
import AboutPage from "../aboutPage/aboutPage"
import ContactsPage from "../contactsPage/contactsPage";
import { Provider } from "react-redux";
import store from "../../redux/store";


export default function App() {

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
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

