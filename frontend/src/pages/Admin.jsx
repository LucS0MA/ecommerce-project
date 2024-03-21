import React from "react";
import { AdminProvider } from "../contexts/AdminContext";
import AdminContent from "../components/admincomponents/AdminContent";
import { ModalProvider } from "../contexts/ConnexionContext";

function Admin() {
  return (
    <ModalProvider>
      <AdminProvider>
        <AdminContent />
      </AdminProvider>
    </ModalProvider>
  );
}

export default Admin;
