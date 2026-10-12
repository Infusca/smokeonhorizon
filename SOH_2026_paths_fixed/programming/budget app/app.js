// BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentages = function(){
        return this.percentage;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
      var sum = 0;
      data.allItems[type].forEach(function(cur){ //cur = current element
        sum += cur.value;
      });
      data.totals[type] = sum;

    };

    var data = {
        allItems: {
          exp: [],
          inc: []
        },
        totals: {
          exp: 0,
          inc: 0
        },
        budget: 0,
        percentage: -1 // means non existant, so it doesn't exist yet.
    };

    return{
      addItem: function(type, desc, val){
          var newItem, ID;

          if (data.allItems[type].length > 0){
              ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

            // Create new item based on 'inc' or 'exp' type
          if (type === 'exp'){
            newItem = new Expense(ID, desc, val);
          } else if (type === 'inc'){
            newItem = new Income(ID, desc, val);
          }
            // Push it into our data structure
          data.allItems[type].push(newItem);

            // Return the new element
          return newItem;
      },

      deleteItem: function(type, id){
          var ids, index;

          ids = data.allItems[type].map(function(current){
              return current.id;
          });

          index = ids.indexOf(id);

          if (index !== -1){
            data.allItems[type].splice(index, 1); // will remove just 1 id
          }
      },

      calculateBudget: function(){
        // 1. calc all incomes & expenses
          calculateTotal('exp');
          calculateTotal('inc');
        // 2. calc budget (income - expenses)
          data.budget = data.totals.inc - data.totals.exp;
        // 3. calc percentage
          if (data.totals.inc >0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
          } else {
            data.percentage = -1;
          };

      },

      getBudget: function(){
          return {
            budget: data.budget,
            totalIncome: data.totals.inc,
            totalExpenses: data.totals.exp,
            percentage: data.percentage
          };
      },

      calculatePercentages: function(){
          data.allItems.exp.forEach(function(cur){
              cur.calcPercentage(data.totals.inc);
          });
      },

      getPercentages: function(){
          var allPerc = data.allItems.exp.map(function(cur){  // map returns and stores in variable (forEach does not)
              return cur.getPercentages();
          });
          return allPerc;
      }

    };

})();


// UI CONTROLLER
var UIController = (function() {

  // Store querySelector strings in object so it's not repeated so often incase of having to make changes to class names
    var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      incomeLabel: '.budget__income--value',
      expensesLabel: '.budget__expenses--value',
      percentageLabel: '.budget__expenses--percentage',
      container: '.container',
      expensesPercLabel: '.item__percentage',
      dateLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type){
      var numSplit, int, dec, type;
    // 1. + or - before number
    // 2. exactly 2 decimal points
    // 3. comma separating thousands
      num = Math.abs(num); //absolute removes sign from number
      num = num.toFixed(2); //toFixed: to get '2' decimal points. Creates string.
      numSplit = num.split('.');
      int = numSplit[0];
      if (int.length > 3){
          int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // substring - takes part of string(starting position, number read)
      }
      dec = numSplit[1];

      return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  var nodeListForEach = function(list, callback){
    for (var i = 0; i < list.length; i++){
        callback(list[i], i);
      }
    };

  return{
    getInput: function(){
      return {
      /* instead of returning 3 values --> return one object. Replace:
          var type = document.querySelector('.add__type').value; // Will be inc or exp
          var description = document.querySelector('.add__description').value;
          var value = document.querySelector('.add__value').value;
      with the following*/
      type: document.querySelector(DOMstrings.inputType).value, // Will be inc or exp
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // parseFloat converts string to a number
      };
    },

    addListItem: function(obj, type) {
        var html, newHTML, element;
        // Create HTML string with placeholder text
        if (type === 'inc'){
          element = DOMstrings.incomeContainer;
          html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>\
          <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">\
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        } else if (type === 'exp') {
          element = DOMstrings.expensesContainer;
          html = '<div class="item clearfix" id="exp-%id%"><div class="item_description">%description%</div>\
          <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div><div class="item__delete">\
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        // Replace placeholder text with dateLabel
          newHTML = html.replace('%id%', obj.id);
          newHTML = newHTML.replace('%description%', obj.description);
          newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
        // Insert HTML into DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    },

    deleteListItem: function(selectorID){
        // can only remove remove child.
        var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);
    },

    clearFields: function(){
        var fields, fieldsArr;
          // querySelectorAll returns lists rather than arrays
        fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

        fieldsArr = Array.prototype.slice.call(fields); // give list to array prototype so it returns an arrays

          // callback function here can take up to 3 arguments: currentvalue(element), index #, entire array.
        fieldsArr.forEach(function(current, index, array){
          current.value = '';
        });

        fieldsArr[0].focus();
      },

    displayBudget: function(obj){
        obj.budget > 0 ? type = 'inc' : type = 'exp';
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExpenses, 'exp');

        if (obj.percentage > 0) {
          document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
        } else {
          document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        }
    },

    displayPercentages: function(percentages){
        var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // returns NodeList

    nodeListForEach(fields, function(current, index){
            if (percentages[index] > 0) {
              current.textContent = percentages[index] + '%';
            } else {
              current.textContent = '---';
            }
        });
    },

    displayMonth: function(){
        var now, year, month, months;
        now = new Date();
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();
        year = now.getFullYear();
        document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },

    changedType: function(){
        var fields = document.querySelectorAll(
            DOMstrings.inputType + ',' +
            DOMstrings.inputDescription + ',' +
            DOMstrings.inputValue);
            console.log(fields);
        nodeListForEach(fields, function(cur) {
              cur.classList.toggle('red-focus');
            });

        document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },

    getDOMstrings: function() {
        return DOMstrings;
    }
  };
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

  var setUpEventListeners = function(){
      var DOM = UICtrl.getDOMstrings();

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // Make it so when hitting "enter", button is pressed
      document.addEventListener('keypress', function(event){
        // .which property is for older browsers that don't use .keyCode
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType); // when user changes from int to exp

  };

  var updatePercentages = function(){

      // 1. Calculate getPercentages
        budgetCtrl.calculatePercentages();
      // 2. Read % from budget CONTROLLER
        var percentages = budgetCtrl.getPercentages();
      // 3. Update UI
        UICtrl.displayPercentages(percentages);
  };

  var updateBudget = function(){
    // 1. Calculate budget
      budgetCtrl.calculateBudget();
    // 2. Return budget
      var budget = budgetCtrl.getBudget();
    // 3. Display budget on UI
      UICtrl.displayBudget(budget);
  };

  var  ctrlAddItem = function(){

      var input, newItem;
    // 1. Get filed input data
      input = UICtrl.getInput();

      if(input.description !== "" && !isNaN(input.value) && input.value > 0){
    // 2. Add item to budget CONTROLLER
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
    // 4. Clear the fields
      UICtrl.clearFields();
    // 5. Calculate and update budget
      updateBudget();
    // 6. Calculate and update %
      updatePercentages();
    };
  };

  var ctrlDeleteItem = function(event){ //pass event in here so you know what target element is for event delegation
      var itemID, splitID, type, ID;

      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

      if (itemID){ //will be true if it exists or else will be false
        // each ID is income-0 ie. Need to split string.
          splitID = itemID.split('-');
          type = splitID [0];
          ID = parseInt(splitID[1]);

          // 1. Delete item from data structure
            budgetCtrl.deleteItem(type, ID);
          // 2. Delete item from UI
            UICtrl.deleteListItem(itemID);
          // 3. Update UI
            updateBudget();
          // 4. Calculate and update %
            updatePercentages();
      };
  };

  return{
    init: function(){
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: -1
      });
      setUpEventListeners();

    }
  };


})(budgetController, UIController);

controller.init();
