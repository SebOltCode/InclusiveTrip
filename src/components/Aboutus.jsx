import React from 'react';

const Aboutus = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-left">Über uns</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Willkommen auf unserer Webseite! Wir sind eine kleine, aber leidenschaftliche Gruppe von Entwicklern – Sebastian, Adnan, Ahmed und Julia – die im Rahmen des Bootcamps der WBS Coding School zusammengefunden haben, um eine App zu entwickeln, die wirklich einen Unterschied macht.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Unsere Vision</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Unsere Reise begann mit einem einfachen, aber kraftvollen Gedanken: Wie können wir Menschen mit einer Barriere das Leben leichter machen? Für uns alle war es von Anfang an klar, dass wir etwas schaffen wollen, das einen echten positiven Einfluss auf das tägliche Leben vieler Menschen hat. Wir haben uns gefragt, wie es wäre, wenn wir einen Weg finden könnten, die Welt ein Stück barrierefreier zu machen.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Unsere Mission</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Unsere Mission ist es, Menschen mit unterschiedlichen Barrieren – sei es eine körperliche Einschränkung wie eine Sehbehinderung, eine Gehörlosigkeit oder die Nutzung eines Rollstuhls – dabei zu unterstützen, ihre Umgebung besser zu navigieren und sicherzustellen, dass die Orte, die sie besuchen, ihren Bedürfnissen gerecht werden. Unsere App ermöglicht es, Lokationen wie Restaurants, Kinos, Krankenhäuser, Parkplätze und vieles mehr zu bewerten und so eine Gemeinschaft zu schaffen, die sich gegenseitig hilft.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Warum wir diese App entwickelt haben</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Die Idee für unsere App entstand aus dem tiefen Wunsch heraus, Teil einer inklusiveren Gesellschaft zu sein. Jeder von uns hat in seinem Umfeld Menschen erlebt, die täglich mit Barrieren konfrontiert sind, die für andere oft unsichtbar bleiben. Diese Erfahrungen haben uns motiviert, etwas zu schaffen, das nicht nur die physische, sondern auch die soziale Zugänglichkeit fördert.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        Wir wollten eine Plattform schaffen, die nicht nur bewertet, sondern auch aufzeigt, wie einfach es sein kann, Barrieren zu überwinden, wenn man nur die richtigen Informationen hat. Die App ist unser Beitrag, um Menschen mit besonderen Bedürfnissen mehr Freiheit und Unabhängigkeit zu ermöglichen.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Unser Team</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Wir, das Team hinter der App, sind stolz auf das, was wir in kurzer Zeit erreicht haben. Jeder von uns hat seine eigene Motivation und Geschichte, die ihn zu diesem Projekt geführt hat:
      </p>

      <div className="flex flex-wrap justify-center space-x-6">
        <div className="text-center mb-6">
          <img src="/images//Photosebastian.jpeg" alt="Sebastian" className="w-32 h-32 rounded-full mb-4 object-cover" />
          <p className="text-gray-700 font-semibold">Sebastian</p>
        </div>
        <div className="text-center mb-6">
          <img src="/images//Photoadnan.jpeg" alt="Sebastian" className="w-32 h-32 rounded-full mb-4 object-cover" />
          <p className="text-gray-700 font-semibold">Adnan</p>
        </div>
        <div className="text-center mb-6">
          <img src="/images//Photoahmed.jpeg" alt="Sebastian" className="w-32 h-32 rounded-full mb-4 object-cover" />
          <p className="text-gray-700 font-semibold">Ahmed</p>
        </div>
        <div className="text-center mb-6">
          <img src="/images//Photojulia.jpeg" alt="Sebastian" className="w-32 h-32 rounded-full mb-4 object-cover" />
          <p className="text-gray-700 font-semibold">Julia</p>
        </div>






      </div>

      <p className="text-gray-700 leading-relaxed">
        Zusammen haben wir nicht nur eine App entwickelt, sondern auch eine Vision zum Leben erweckt, die wir mit der Welt teilen möchten. Wir hoffen, dass unsere App zu einem Werkzeug wird, das Barrieren abbaut und Brücken baut – für ein inklusiveres Miteinander.
      </p>

      <p className="text-gray-700 leading-relaxed mt-6">
        Vielen Dank, dass Sie Teil dieser Reise sind und mit uns die Welt ein wenig besser machen möchten.
      </p>
    </div>
  );
};

export default Aboutus;
