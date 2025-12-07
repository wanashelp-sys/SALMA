function HeroSection({ onStart }) {
  return (
    <section className="welcome-card card-playful mb-5 p-5 text-center">
      <div className="welcome-emoji mb-3">🎯</div>
      <h2 className="display-5 fw-bold mb-3">مرحباً بك في معمل الأرقام!</h2>
      <p className="lead mb-4">اختاري لعبتك المفضلة وابدئي الاستكشاف والمرح مع الرياضيات</p>
      <button className="btn btn-primary-salma btn-lg px-5 py-3" onClick={onStart}>
        <i className="fas fa-play-circle ms-2"></i>
        ابدئي الآن
      </button>
    </section>
  );
}

export default HeroSection;
