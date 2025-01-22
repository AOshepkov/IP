const ExcrcDesc = [
  {
    Title: 'Таблица',
    Description: `На экран выводится таблица, в ячейках которой располагаются числа в случайном порядке. Задача заключается в том, чтобы упорядочить эти числа по возрастанию, последовательно нажимая на  них: от 1 и далее.
Двойной счет – усложненная версия тренажера. Теперь в таблице присутствуют 2 типа чисел, различающихся по цвету. Задача заключается в расстановке чисел 1 типа по возрастанию, а 2 типа – по убыванию, поочерёдно нажимая на числа разных типов.`,
    name: 'excrc_table',
    src: '/src/pictures/1.png',
    params: ['diff', 'hardver'],
    diff: [
      { diff: 0, size: { height: 4, width: 4 } },
      { diff: 1, size: { height: 6, width: 6 } },
      { diff: 2, size: { height: 8, width: 8 } },
      { diff: 3, size: { height: 10, width: 10 } },
      { diff: 4, size: { height: 12, width: 12 } },
    ],
  },
  {
    Title: 'Найди пару',
    Description: `На экран выводится таблица, состоящая из элементов, из которых только 2 повторяются. Задача как можно быстрее найти эти повторяющиеся элементы и выбрать их.`,
    name: 'excrc_pair',
    // src: '/src/pictures/2.png',
    params: ['diff'],
    diff: [
      { diff: 0, size: { height: 2, width: 2 }, div: 8 },
      { diff: 1, size: { height: 2, width: 2 }, div: 7 },
      { diff: 2, size: { height: 2, width: 2 }, div: 6 },
      { diff: 3, size: { height: 2, width: 2 }, div: 5 },
      { diff: 4, size: { height: 2, width: 2 }, div: 4 },
    ],
  },
  {
    Title: 'Буквы и цифры',
    Description: `Экран разделен на 2 части, в каждой из которых находиться вопрос о цифре или букве. В одной из частей появляется комбинация из буквы и цифры. Задача заключается в ответе на тот вопрос, в части которого оказалась эта комбинация.`,
    name: 'excrc_num',
    src: '/src/pictures/3.png',
  },
  {
    Title: 'Геометрия',
    Description: `Экран разделен на 2 части, в каждой из которых находиться вопрос о цвете или форме буквы. В одной из частей появляется фигура определённого цвета. Задача заключается в ответе на тот вопрос, в части которого оказалась эта фигура.`,
    name: 'excrc_geom',
    src: '/src/pictures/4.png',
  },
  {
    Title: 'Соответствия',
    Description: `На экран выводятся элементы, обладающие каким-нибудь признаком (к примеру, цвет или числовое значение). Задача заключается в распределении данных элементов по заранее установленным категориям, путем выбора нужной из имеющихся на экране.`,
    name: 'excrc_types',
    src: '/src/pictures/5.png',
  },
]
const ExcrcGeom = {
  col: [
    {
      question: 'Is the color red?',
      js: obj => obj.col == 'red',
      css: 'background-color:red;',
      inf: 'red',
    },
    {
      question: 'Is the color blue?',
      js: obj => obj.col == 'blue',
      css: 'background-color:blue;',
      inf: 'blue',
    },
    {
      question: 'Is the color green?',
      js: obj => obj.col == 'green',
      css: 'background-color:green;',
      inf: 'green',
    },
  ],
  shape: [
    {
      question: 'Is the shape square?',
      js: obj => obj.shape == 'square',
      css: 'clip-path: polygon(10% 10%,10% 90%, 90% 90%, 90% 10%);',
      inf: 'square',
    },
    {
      question: 'Is the shape circle?',
      js: obj => obj.shape == 'circle',
      css: 'clip-path: circle();',
      inf: 'circle',
    },
    {
      question: 'Is the shape triangle?',
      js: obj => obj.shape == 'triangle',
      css: 'clip-path:polygon(0 100%, 50% 0, 100% 100%);',
      inf: 'triangle',
    },
  ],
}

export { ExcrcDesc, ExcrcGeom }
