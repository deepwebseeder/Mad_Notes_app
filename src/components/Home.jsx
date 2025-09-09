import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { loadNotesFromStorage } from "../store/notesSlice";
import { saveToStorage, loadFromStorage } from "../utils/localStorage";
import Header from "./Header";
import SearchAndFilter from "./SearchAndFilter";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import "./Home.css";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData) {
      dispatch(loadNotesFromStorage(savedData));
    }
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      saveToStorage({
        notes: state.notes.notes,
        tags: state.notes.tags,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app">

      <Header />
      <main className="main-content">
        <div className="container">
          <NoteForm />
          <SearchAndFilter />
          <NotesList />
        </div>
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
