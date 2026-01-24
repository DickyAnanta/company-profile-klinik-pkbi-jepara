export default function MapSection() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border-2 border-slate-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2030268.128156084!2d107.46370944951602!3d-6.346442954367482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711f109a1d8611%3A0x1c8dab87e40ab8c7!2sKlinik%20Wahana%20Sejahtera%20PKBI%20Jepara!5e0!3m2!1sid!2sid!4v1769141095315!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lokasi Klinik PKBI Jepara"
      ></iframe>
    </div>
  );
}