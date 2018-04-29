; (function () {
  const serviceList = [],
    placeList = [],
    creationList = [],
    sessionList = [];

  let servicesIdCount = 0,
    placesIdCount = 0,
    creationsIdCount = 0,
    sessionsIdCount = 0;

  const serviceListElement = document.getElementById('serviceList'),
    placeListElement = document.getElementById('placeList'),
    creationListElement = document.getElementById('creationList'),
    sessionListElement = document.getElementById('sessionList');

  const servicesElement = document.getElementById('services'),
    placesElement = document.getElementById('places'),
    creationsElement = document.getElementById('creations'),
    sessionsElement = document.getElementById('sessions');

  serviceListElement.lastElementChild.onclick = () => serviceList.push(createService());
  placeListElement.lastElementChild.onclick = () => placeList.push(createPlace());
  creationListElement.lastElementChild.onclick = () => creationList.push(createCreation());
  sessionListElement.lastElementChild.onclick = () => sessionList.push(createSession());
  document.getElementById('result').firstElementChild.onclick = generate;

  serviceList.push(createService());
  placeList.push(createPlace());
  creationList.push(createCreation());
  sessionList.push(createSession());

  function generate() {
    const servicesResult = serviceList.map((service, index) => {
      const elem = service.getElementsByTagName('input');
      let discount;

      if (elem.discount.value) {
        const disElem = servicesElement.querySelector(`div[id='${elem.discount.value}']`).getElementsByTagName('input');
        discount = createObj(disElem);
      }

      resultElem = createObj(elem);
      resultElem.Discount = discount;
      
      return resultElem;
    });

    
  }

  function createObj(elem) {
    return {
      ServiceId: parseInt(elem.serviceId.value),
      Price: parseInt(elem.price.value),
      Name: elem.name.value,
      FullName: elem.fullname.value
    }
  }

  function createService() {
    const id = createElement('input', 'number', 'number-field', 'id'),
      serviceId = createElement('input', 'number', 'number-field', 'serviceId'),
      name = createElement('input', 'text', 'text-field', 'name'),
      fullName = createElement('input', 'text', 'text-field', 'fullname'),
      price = createElement('input', 'number', 'number-field', 'price'),
      discount = createElement('input', 'number', 'number-filed', 'discount'),
      remove = createElement('button', 'button', 'btn', 'button'),
      service = [id, serviceId, name, fullName, price, discount, remove],
      serviceItem = document.createElement('div');

    id.value = ++servicesIdCount;
    id.readOnly = true;
    serviceItem.id = id.value;
    serviceItem.classList.add('item');

    service.forEach(e => {
      serviceItem.appendChild(e);
    });

    servicesElement.appendChild(serviceItem);

    remove.appendChild(document.createTextNode('Remove'));
    remove.onclick = () => servicesElement.removeChild(serviceItem);

    return serviceItem;
  }

  function createPlace() {
    const id = createElement('input', 'number', 'number-field', 'id'),
      name = createElement('input', 'text', 'text-field', 'name'),
      remove = createElement('button', 'button', 'btn', 'button'),
      place = [id, name, remove],
      placeItem = document.createElement('div');

    id.value = ++placesIdCount;
    id.readOnly = true;
    placeItem.id = id.value;
    placeItem.classList.add('item');

    place.forEach(e => {
      placeItem.appendChild(e);
    });

    placesElement.appendChild(placeItem);

    remove.appendChild(document.createTextNode('Remove'));
    remove.onclick = () => placesElement.removeChild(placeItem);

    return placeItem;
  }

  function createCreation() {
    const id = createElement('input', 'number', 'number-field', 'id'),
      name = createElement('input', 'text', 'text-field', 'name'),
      placeId = createElement('input', 'number', 'number-field', 'placeId'),
      placeCount = createElement('input', 'number', 'number-field', 'placeCount'),
      remove = createElement('button', 'button', 'btn', 'button'),
      creation = [id, name, placeId, placeCount, remove],
      creationItem = document.createElement('div');

    id.value = ++creationsIdCount;
    id.readOnly = true;
    creationItem.id = id.value;
    creationItem.classList.add('item');

    creation.forEach(e => {
      creationItem.appendChild(e);
    });

    creationsElement.appendChild(creationItem);

    remove.appendChild(document.createTextNode('Remove'));
    remove.onclick = () => creationsElement.removeChild(creationItem);

    return creationItem;
  }

  function createSession() {
    const id = createElement('input', 'number', 'number-field', 'id'),
      serviceIds = createElement('input', 'text', 'text-field', 'serviceIds'),
      creationId = createElement('input', 'number', 'number-field', 'creationId'),
      startTime = createElement('input', 'time', 'time-field', 'startTime'),
      minDate = createElement('input', 'date', 'date-field', 'minDate'),
      maxDate = createElement('input', 'date', 'date-field', 'maxDate'),
      daysOfWeek = createElement('input', 'text', 'text-field', 'daysOfWeek'),
      exceptionDays = createElement('input', 'text', 'text-field', 'exceptionDays'),
      remove = createElement('button', 'button', 'btn', 'button'),
      session = [id, serviceIds, creationId, startTime, minDate, maxDate, daysOfWeek, exceptionDays, remove],
      sessionItem = document.createElement('div');

    id.value = ++sessionsIdCount;
    id.readOnly = true;
    sessionItem.id = id.value;
    sessionItem.classList.add('item');

    session.forEach(e => {
      sessionItem.appendChild(e);
    });

    sessionsElement.appendChild(sessionItem);

    remove.appendChild(document.createTextNode('Remove'));
    remove.onclick = () => sessionsElement.removeChild(sessionItem);

    return sessionItem;
  }

  function createElement(tagName, type, className, name) {
    const elem = document.createElement(tagName);
    elem.type = type;
    elem.classList.add(className);
    elem.name = name;
    if (type === 'number') elem.min = 0;

    return elem;
  }
}());