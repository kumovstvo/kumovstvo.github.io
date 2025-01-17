function randint(max) {
  return Math.floor(Math.random() * max);
}

function genMyor() {
  if(randint(100) >= 95) {
    return "Мёр";
  } else {
    return "Мер";
  }
}

let footerHTML = `
<div id="footer">
  <div id="footerTitle">(c) Система «Кумовство»</div>
  <div style="font-size: 14px; color:#6a6e72;">
  При поддержке МКФЗ «Typuщво Interparsing» <br>
  Для связи: <a href="mailto:kumovstvo@inbox.ru">kumovstvo@inbox.ru</a>
  </div>
  <p>Точность информации не гарантируется</p>
  <p>Мы не курим и вам не советуем</p>
  <p>Деятельность Meta Platforms Inc. (Facebook и Instagram) запрещена в Российской Федерации</p>
  <p>Введённые данные не отправляются на удалённые вычислители</p>
  <p>Для долгосрочного хранения введённой информации эксплуатируются cookie файлы</p>
  <center>
    <p style="font-family: sans-serif; font-size: 8pt;">ПРЕДУПРЕЖДЕНИЕ: Компания ParallelGraphics не является владельцем домена lenin.ru<br>
      и не имеет отношения к другим проектам в домене lenin.ru.<br>
      С вопросами по проектам, адреса которых начинаются НЕ с www.lenin.ru,<br>
      просьба обращаться напрямую к авторам этих проектов.
    </p>
  </center>
</div>
`

site.insertAdjacentHTML("beforeend", footerHTML)