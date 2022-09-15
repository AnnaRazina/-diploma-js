/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('.sidebar-mini'); 
    sidebarToggle.addEventListener ('click', (event) => {
      event.preventDefault()
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector('.menu-item_login').onclick = event => {
      event.preventDefault();
      App.getModal('login').open();
    };

    document.querySelector('.menu-item_register').onclick = event => {
      event.preventDefault();
      App.getModal('register').open();
    };
  
    function transactionRemove () {
      let transactions = Array.from(document.querySelectorAll('.transaction'));
      transactions.forEach(item => item.remove());
    };

    document.querySelector('.menu-item_logout').onclick = event => {
      event.preventDefault();
      User.logout((err, response) => {
        if(response && response.success) {
          transactionRemove();
          App.setState('init');
        };
      });
    }
  }
}
