import { ProfileProvider } from "./ProfileContext";
import UserInfos from "./UserInfos";
// Autres imports

function App() {
  return (
    <ProfileProvider>
      <div className="App">
        <UserInfos />
        {/* Autres composants */}
      </div>
    </ProfileProvider>
  );
}

export default App;
