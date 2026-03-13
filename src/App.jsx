import Users from "./components/Users";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <header className="app-header">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <div>
          <h1>User <span>Directory</span></h1>
          {/* <p>Live data from JSONPlaceholder API · useEffect + useState</p> */}
        </div>
      </header>
      <main>
        <Users />
      </main>
    </div>
  );
}
