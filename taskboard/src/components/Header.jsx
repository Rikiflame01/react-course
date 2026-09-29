function Header({ tasks }) {
  return (
    <header className="page-header">
      <p className="page-kicker">Damian Grobler</p>
      <h1>TaskBoard</h1>
      <p className="task-count">{tasks.length} tasks</p>
    </header>
  );
}

export default Header;
