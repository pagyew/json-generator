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
document.getElementById('resultArea').firstElementChild.onclick = generate;

serviceList.push(createService());
placeList.push(createPlace());
creationList.push(createCreation());
sessionList.push(createSession());

function generate() {
  const servicesResult = serviceList.map((service, index) => {
    const elem = service.getElementsByTagName('input');
    let discount;

    if (elem.discount.value) {
      let disElem;
      [].forEach.call(servicesElement.querySelectorAll(`input[name='id']`), e => {
        e.value == elem.discount.value ? disElem = e : false;
      });
      discount = createServiceObj(disElem.parentElement.getElementsByTagName('input'));
    }

    let resultElem = createServiceObj(elem);
    resultElem.Discount = discount;

    return resultElem;
  });

  const placesResult = placeList.map((place, index) => {
    const elem = place.getElementsByTagName('input');

    let resultElem = createPlaceObj(elem);

    return resultElem;
  });

  const creationsResult = creationList.map((creation, index) => {
    const elem = creation.getElementsByTagName('input');

    let resultElem = createCreationObj(elem);

    return resultElem;
  });

  const sessionsResult = sessionList.map((session, index) => {
    const elem = session.getElementsByTagName('input');

    let resultElem = createSessionObj(elem);

    return resultElem;
  });

  const excludeResult = sessionList.reduce((prev, session) => {
    const elem = session.getElementsByTagName('input');
    elem.exceptionDays.value.split(',').forEach(day => {
      prev.push(createExcludeObj(elem.id.value, day.trim()));
    });
    return prev;
  }, []);

  const result = {
    ValidatePrices: true,
    Services: servicesResult,
    SessionGenerationRules: sessionsResult.map((session, index) => {
      return {
        Id: session.Id,
        Name: session.StartTime,
        SourcePlaceId: creationsResult.find(creation => creation.Id === session.CreationId).PlaceId,
        SourcePlaceName: placesResult.find(place => place.Id === creationsResult.find(creation => creation.Id === session.CreationId).PlaceId).Name,
        SourceCreationId: session.CreationId,
        SourceCreationName: creationsResult.find(creation => creation.Id === session.CreationId).Name,
        Services: session.Services.map(e => parseInt(e)),
        StartTime: `${session.StartTime}:00`,
        PlaceCount: creationsResult.find(creation => creation.Id === session.CreationId).PlaceCount,
        MinDate: `${new Date(session.MinDate).toJSON().slice(0, -1)}+03:00`,
        MaxDate: `${new Date(session.MaxDate).toJSON().slice(0, -1)}+03:00`,
        DaysOfWeek: session.DaysOfWeek.map(e => parseInt(e))
      }
    }),
    sessionExcludeRules: excludeResult,
    DiscountCode: document.getElementById('discountName').value || undefined
  }

  document.getElementById('result').value = JSON.stringify(result, null, 4);

}

function test() {
  document.querySelector('div#services input[name=id]').value = 123;
  document.querySelector('div#services input[name=name]').value = '123';
  document.querySelector('div#services input[name=fullname]').value = '123';
  document.querySelector('div#services input[name=price]').value = 123;
  document.querySelector('div#places input[name=name]').value = '123';
  document.querySelector('div#creations input[name=name]').value = '123';
  document.querySelector('div#creations input[name=placeId]').value = 1;
  document.querySelector('div#creations input[name=placeCount]').value = 123;
  document.querySelector('div#sessions input[name=serviceIds]').value = '123';
  document.querySelector('div#sessions input[name=creationId]').value = 1;
  document.querySelector('div#sessions input[name=startTime]').value = '11:00';
  document.querySelector('div#sessions input[name=minDate]').value = '2018-05-01';
  document.querySelector('div#sessions input[name=maxDate]').value = '2018-06-01';
  document.querySelector('div#sessions input[name=daysOfWeek]').value = '1';
  document.querySelector('div#sessions input[name=exceptionDays]').value = '2018-05-15';
}

test();

function createServiceObj(elem) {
  return {
    ServiceId: parseInt(elem.id.value),
    Price: parseInt(elem.price.value),
    Name: elem.name.value,
    FullName: elem.fullname.value
  }
}

function createPlaceObj(elem) {
  return {
    Id: parseInt(elem.id.value),
    Name: elem.name.value
  }
}

function createCreationObj(elem) {
  return {
    Id: parseInt(elem.id.value),
    Name: elem.name.value,
    PlaceId: parseInt(elem.placeId.value),
    PlaceCount: parseInt(elem.placeCount.value)
  }
}

function createSessionObj(elem) {
  return {
    Id: parseInt(elem.id.value),
    Services: elem.serviceIds.value.split(',').map(e => e.trim()),
    CreationId: parseInt(elem.creationId.value),
    StartTime: elem.startTime.value,
    MinDate: elem.minDate.value,
    MaxDate: elem.maxDate.value,
    DaysOfWeek: elem.daysOfWeek.value.split(',').map(e => e.trim()),
    ExceptionDays: elem.exceptionDays.value.split(',').map(e => e.trim())
  }
}

function createExcludeObj(id, day) {
  return {
    RuleId: parseInt(id),
    DeleteSessions: true,
    ExcludeStartTime: new Date(day).toJSON().slice(0, -5),
    ExcludeEndTime: new Date(day).toJSON().slice(0, -5)
  }
}

function createService() {
  const id = createElement('input', 'number', 'number-field', 'id'),
    name = createElement('input', 'text', 'text-field', 'name'),
    fullName = createElement('input', 'text', 'text-field', 'fullname'),
    price = createElement('input', 'number', 'number-field', 'price'),
    discount = createElement('input', 'number', 'number-filed', 'discount'),
    remove = createElement('button', 'button', 'btn', 'button'),
    service = [id, name, fullName, price, discount, remove],
    serviceItem = document.createElement('div');

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