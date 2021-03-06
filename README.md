# Ограничения

Так как в Solidity нет полноценной поддержки float типа, а нам надо работать с коэффициентами, то было принято решение, все коэффициенты умножать на 100, деньги на 1000000 (микровалюта) и лошадиные силы на 100.

# Расчет стоимости полиса ОСАГО

Ввиду большого количества коэффициентов расчёта стоимости страхового полиса, будет реализован один сценарий оформления:

| Описание                    | Коэффициент                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| По мощности                 | вычисляется на основании данных из смартконтракта автомобиля                   |
| По сроку страхования        | не используется (коэффициент 1)                                                |
| По периоду использования    | 1 год (коэффициент 1)                                                          |
| По классу                   | вычисляется на основании ранее оформленных полисов для смартконтракта паспорта |
| По наличию прицепа к ТС     | без прицепа (коэффициент 1)                                                    |
| По территории использования | не учитывается (коэффициент 1)                                                 |
| По возрасту и стажу         | при оформлении неограниченного полиса, не учитывается (коэффициент 1)          |
| По допуску лиц к управлению | Неограниченная (коэффициент 1.8)                                               |
| По грубым нарушениям        | без грубых нарушений (коэффициент 1)                                           |

Базовая ставка варьируется в зависимости от страхующего лица - физ. лицо или юридическое и от типа транспортного средства. Реализуем оформление только физ. лицом и только для легкового автомобиля. Страховая компания может выбрать точную сумму в интервале от 3432 руб. до 4118 руб. включительно.
Расчёт коэффициента по мощности происходит в зависимости от количества лошадиных сил транспортного средства:

| Количество лошадиных сил      | Коэффициент |
| ----------------------------- | ----------- |
| до 50 включительно            | 0.6         |
| свыше 50 до 70 включительно   | 1.0         |
| свыше 70 до 100 включительно  | 1.1         |
| свыше 100 до 120 включительно | 1.2         |
| свыше 120 до 150 включительно | 1.4         |
| свыше 150                     | 1.6         |

Коэффициенты, принцип расчёта и базовые ставки взяты с калькулятора стоимости ОСАГО РСА (http://www.autoins.ru/ru/osago/calculator/).

# Смартконтракты

## Российский Союз Автостраховщиков (РСА)

Этот контракт является сертификационным центром и местом, где будет хранится история страхования. Контракт должен выпускать смартконтракты для страховой компании (лицензии), владелец лицензии указывается при создании. Должен хранить адреса контрактов, для проверки лицензий на подлинность. Должен аккумулировать резерв гарантий (2 % от страховой премии) и резерв компенсационных выплат (1 % от страховой премии).

## Страховая компания

Должен создавать смартконтракты страховых полисов, владение остается за страховой компанией. Должен, после создания полиса, сообщить об этом смартконтракту РСА, оставить у себя 77% (нетто-премия) от стоимости полиса и 20% (расходы на осуществление страхования). Должен иметь возможность активировать выданный полис. Должен хранить у себя выданные страховки, чтобы выпущенные страховки не могли быть активированы страховщиком, у которого есть лицензия.

## Страховка

Имеет цену страховки, которая рассчитывается в момент создания страховки. Расчёт цены происходит исходя из коэффициентов выше. Мощность берется из смартконтракта ПТС. Класс страховщика берется исходя из истории оформлений в РСА, через DAPP.
Имеет адрес смартконтракта выдавшей компании.
Имеет адрес смартконтракта ПТС, на который выдана страховка.
Имеет адрес смартконтракта паспорта, на который выдана страховка.
Имеет динамическое поле статуса активации, при запросе этого поля, смартконтракт должен смотреть текущее время блока и сравнивать его с датой начала активации и конца, если текущее время за рамками временного отрезка начала и конца, то должен возвращать false, иначе true.

> Валидацию следующих документов не относится к теме дипломной работы, поэтому, создавать их может любой пользователь сети. Иначе, система разрастается до автомобильного завода, ГИБДД, паспортного стола и т.д.

## Паспорт

Имеет дату рождения в UNIXTIME.
Имеет фамилию, имя и отчество
Данный смартконтракт, в текущей работе, имеет исключительно идентифицирующую роль, чтобы можно было валидно рассчитывать классовый коэффициент

## ПТС

Имеет кол. лошадиных сил. Имеет VIN номер, хотя, в потенциале, этот номер не нужен будет. В будущем, адрес смартконтракта сможет прекрасно его заменять. Имеет поле текущего владельца и функцию передачи владения. При этом, предыдущий владелец кладется в log, чтобы можно было проследить историю владения.
