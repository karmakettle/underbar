(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var length = array.length;
    var nCompare = n > length - 1 ? array : array.slice(length - n, length);
    return n === undefined ? array[length - 1] : nCompare;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    var array = Array.isArray(collection);
    if (array) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (i in collection) {
        iterator(collection[i], i, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var rejectTest = function(item) {
      return test(item) ? false : item;
    }
    return _.filter(collection, rejectTest);
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    if (arguments[2]) {
      var current;
      _.each(array, function(item, index, array) {
        if (item !== current) {
          current = item;
          result.push(item);
        }
      });
    }
    else {
      _.each(array, function(item, index, array) {
        if (!(item in result)) {
          result.push(item);
        }
      });
    }

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(item, index, collection){
      result.push(iterator(item, index, collection));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var result, listSlice;
    if (accumulator !== undefined) {
      result = accumulator;
      listSlice = collection;
    }
    else {
      result = collection[0];
      listSlice = collection.slice(1, collection.length);
    }
    _.each(listSlice, function(item){
      result = iterator(result, item);
    });
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var iterFcn = (iterator) ? iterator : _.identity;
    return _.reduce(collection, function(doesMatch, item) {
      if (!(doesMatch)) {
        return false;
      }
      //Must cast to boolean in case 0 or 1 are passed in - KL
      //0 && true returns 0. Must cast this to return false - KL
      return Boolean(iterFcn(item)) && doesMatch;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //I tried to find the clever way, but I think I came across the convoluted...
    //I mean, the creative... way - KL
    var iterFcn = (iterator) ? iterator : _.identity;
    var allTrue = _.every(collection, iterFcn);
    var allFalse = _.every(collection, function(item) {
      return !iterFcn(item);
    });
    if (collection.length === 0) {
      return false;
    }
    return allTrue || (!allTrue && !allFalse);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(item, index) {
      _.each(item, function(value, key) {
        obj[key] = value;
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(item, index) {
      _.each(item, function(value, key) {
        if (!(key in obj)) {
         obj[key] = value;
        }
      });
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var computed = {};
    var result;

    return function() {
      var args = Array.prototype.slice.call(arguments);
      if (!(args in computed)) {
        result = func.apply(this, arguments);
        computed[args] = result;
      }
      return computed[args];
    }
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = (Array.prototype.slice.call(arguments, 2));

    setTimeout(function() { return func.apply(this, args); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var arrayCopy = array.slice();
    var result = [];
    var nextIndex;

    do {
      for (var i=0; i<array.length; i++) {
        nextIndex = Math.floor(Math.random() * arrayCopy.length);
        result.push(arrayCopy[nextIndex]);
        arrayCopy.splice(nextIndex, 1);
      }
    } while (result === array);

    return result;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var func = typeof functionOrKey === "string" ? collection[0][functionOrKey] : functionOrKey;
    _.each(collection, function(item, index, collection) {
      collection[index] = func.apply(item);
    });

    return collection;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var func = typeof iterator === "string" ? function(item) { return item[iterator] } : iterator;
    var result = [];
    //2D array; stores [function-value, collection-item]
    var collectionCopy = [];
    var undefineds = [];
    for (var j=0; j<collection.length; j++) {
      var val = func(collection[j])
      if (val === undefined) {
        undefineds.push(collection[j]);
      }
      else {
        collectionCopy.push([val, collection[j]]);
      }
    }
    //put all function-values into value list and get the min
    var collectionCopyLength = collectionCopy.length;
    for (var i=0; i<collectionCopyLength; i++) {
      var collectionVals = [];
      for (var k=0; k<collectionCopy.length; k++) {
        collectionVals.push(collectionCopy[k][0]);
      }
      var minItem = Math.min.apply(null, collectionVals);
      var minItemIdx = _.indexOf(collectionVals, minItem);
      result.push(collectionCopy[minItemIdx][1]);
      collectionCopy.splice(minItemIdx, 1);
    }
    return result.concat(undefineds);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var sortedByLength = _.sortBy(arguments, 'length');
    var lengthOfLongest = sortedByLength[sortedByLength.length-1].length;
    for (var i=0; i<arguments.length; i++) {
      var miniArray = [];
      for (var j=0; j<lengthOfLongest; j++) {
        miniArray.push(arguments[j][i]);
      }
      result.push(miniArray);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];
    for (var i=0; i<nestedArray.length; i++) {
      var next = nestedArray[i];
      if (Array.isArray(next)) {
        result = result.concat(_.flatten(next));
      }
      else {
        result.push(next);
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [];
    var shortest = _.sortBy(arguments, 'length')[0];
    for (var i=0; i<shortest.length; i++) {
      for (var j=0; j<arguments.length; j++) {
        var flag = true;
        if (!_.contains(arguments[j], shortest[i])) {
          flag = false;
          break;
        }
      }
      if (flag) {
        result.push(shortest[i]);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = [];
    for (var i=0; i<array.length; i++) {
      for (var j=1; j<arguments.length; j++) {
        var flag = false;
        if (_.contains(arguments[j], array[i])) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        result.push(array[i]);
      }
    }
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
