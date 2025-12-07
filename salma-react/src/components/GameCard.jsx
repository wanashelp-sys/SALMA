function GameCard({ icon, title, description, difficulty, gameId, onStart }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="game-card card-playful h-100" onClick={() => onStart(gameId)}>
        <div className="card-body text-center p-4">
          <div className="game-icon mb-3">{icon}</div>
          <h4 className="fw-bold mb-3">{title}</h4>
          <p className="text-muted mb-3">{description}</p>
          <span className={`badge badge-${difficulty === 'سهل' ? 'accent' : 'secondary'}`}>
            {difficulty}
          </span>
        </div>
        <div className="card-footer bg-transparent border-0 text-center pb-4">
          <button className="btn btn-outline-primary-salma">
            ابدئي اللعب
            <i className="fas fa-arrow-left me-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
