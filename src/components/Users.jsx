import { useState, useEffect } from "react";

const COMPANY_COLORS = [
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
  "#ff922b", "#cc5de8", "#20c997", "#f06595",
  "#74c0fc", "#a9e34b",
];

const UserCard = ({ user, index }) => {
  const color = COMPANY_COLORS[index % COMPANY_COLORS.length];
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="user-card" style={{ "--accent": color, animationDelay: `${index * 60}ms` }}>
      <div className="card-glow" style={{ background: color }} />
      <div className="card-inner">
        <div className="avatar" style={{ background: `${color}22`, border: `2px solid ${color}55` }}>
          <span style={{ color }}>{initials}</span>
        </div>
        <div className="user-details">
          <h3 className="user-name">{user.name}</h3>
          <a className="user-email" href={`mailto:${user.email}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            {user.email}
          </a>
          <div className="user-meta">
            <span className="meta-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              {user.phone.split(" ")[0]}
            </span>
            <span className="meta-chip company" style={{ background: `${color}18`, color, borderColor: `${color}40` }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              {user.company.name.split(" ")[0]}
            </span>
            <span className="meta-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {user.address.city}
            </span>
          </div>
        </div>
        <a className="visit-btn" href={`https://${user.website}`} target="_blank" rel="noreferrer" style={{ color, borderColor: `${color}50` }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card" style={{ "--c": color }}>
    <div className="stat-icon">{icon}</div>
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState("grid");
  const [cityFilter, setCityFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const cities = ["all", ...new Set(users.map((u) => u.address.city))];

  const filtered = users
    .filter((u) => {
      const q = search.toLowerCase();
      return (
        (u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.company.name.toLowerCase().includes(q)) &&
        (cityFilter === "all" || u.address.city === cityFilter)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      if (sortBy === "city") return a.address.city.localeCompare(b.address.city);
      return 0;
    });

  if (loading) return (
    <div className="state-screen">
      <div className="spinner" />
      <p>Fetching users<span className="dots" /></p>
    </div>
  );

  if (error) return (
    <div className="state-screen error">
      <div className="error-icon">⚠</div>
      <h2>Connection Failed</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="users-page">
      {/* Stats Bar */}
      <div className="stats-row">
        <StatCard label="Total Users" value={users.length} color="#4d96ff"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
        />
        <StatCard label="Cities" value={cities.length - 1} color="#6bcb77"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
        />
        <StatCard label="Showing" value={filtered.length} color="#ffd93d"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>}
        />
        <StatCard label="Companies" value={new Set(users.map(u => u.company.name.split(" ")[0])).size} color="#cc5de8"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>}
        />
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Search by name, email, company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button className="clear-btn" onClick={() => setSearch("")}>✕</button>}
        </div>

        <div className="filter-group">
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            {cities.map(c => <option key={c} value={c}>{c === "all" ? "All Cities" : c}</option>)}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort: Name</option>
            <option value="email">Sort: Email</option>
            <option value="city">Sort: City</option>
          </select>

          <div className="view-toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/></svg>
            </button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No users found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className={`users-grid ${view}`}>
          {filtered.map((user, i) => <UserCard key={user.id} user={user} index={users.indexOf(user)} />)}
        </div>
      )}
    </div>
  );
}
