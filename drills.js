// const Hash = require('./hashmap');
// const HashMap = Hash.HashMap;
class HashMap {
    constructor(initialCapacity = 22) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            return false;
        }
        return this._hashTable[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negative number. 
        return hash >>> 0;
    }
}

function main() {

    const Lotr = new HashMap();
    Lotr.MAX_LOAD_RATIO = 0.5;
    Lotr.SIZE_RATIO = 3;

    Lotr.set('Hobbit', 'Bilbo')
    Lotr.set('Hobbit', 'Frodo')
    Lotr.set('Wizard', 'Gandalf')
    Lotr.set('Human', 'Aragorn')
    Lotr.set('Elf', 'Legolas')
    Lotr.set('Maiar', 'The Necromancer')
    Lotr.set('Maiar', 'Sauron')
    Lotr.set('RingBearer', 'Gollum')
    Lotr.set('LadyOfLight', 'Galadriel')
    Lotr.set('HalfElven', 'Arwen')
    Lotr.set('Ent', 'Treebeard')

    return Lotr.length;
}

// console.log(main());

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10);
    map1.set(str2, 20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20);
    map2.set(str4, 10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

// WhatDoesThisDo()

// 3 
// 3.1
// k mod m
// 10 mod 11 = 10, index
// 22 mod 11 = 0, index
// 31 mod 11 = 9, index
// 4 mod 11 = 4
// 15 mod 11 = 4, uh oh, to 5
// 28 mod 11 = 6
// 17 mod 11 = 6, to 7
// 88 mod 11 = 0, to 1
// 59 mod 11 = 4, to 8

// 3.2
/* Open Addressing end num, separate chaining is first num
5 % 9 = 5
28 % 9 = 1
19 % 9 = 1.next, 2
  1.next = (19 % 9).value
15 % 9 = 6
20 % 9 = 2.next, 3
33 % 9 = 6.next, 7
12 % 9 = 3.next, 4
    = 3, 3.next.next;
    = 3, 3.next.next.next;
17 % 9 = 8
10 % 9 = 1.next.next, 2, 3, 4, 5
*/


// 4

function removeDuplicates(str) {
    const strMap = new HashMap();
    str = str.split('')
    // const strCopy = str.slice().split('');
    // console.log(strCopy)

    // second counter to track copy index
    for (let i = 0; i < str.length; i++) {
        if (strMap.get(str[i])) {
            str.splice(i, 1);
            i--;
        } else {
            strMap.set(str[i], true);
        }
    }
    return str.join('');
}

// console.log(removeDuplicates('google'))
// console.log(removeDuplicates('cat in the hat qFcat in the hat q F'))
// console.log(removeDuplicates('google all that you can think of'))


//Changed capacity to 22, now it works. Capacity seems to not be updating

function palindromes(str) {
    const strMap = new HashMap();
    str = str.split('')
    let count = 0;
    let length = str.length;
    for (let i = 0; i < str.length; i++) {
        if (strMap.get(str[i])) {
            str.splice(i, 1);
            count++
            i--;
        } else {
            strMap.set(str[i], true);
        }
    }
    if (length - (count * 2) > 1) {
        console.log(avg - (count * 2))
        return false
    } else if (length - (count * 2) <= 1) {
        return true;
    } else {
        return false;

    }
}

// console.log(palindromes('racecar'))
// console.log(palindromes('acecarr'))  
// console.log(palindromes('acecar')) // false
// console.log(palindromes('solos'))
// console.log(palindromes('zaparpaz'))
// if and only if one character appears an odd number of times

function includesPalindrome(str) {
    const strMap = {};
    for (let i = 0; i < str.length; i++) {
        if (strMap[str[i]]) {
            strMap[str[i]] += 1;
        } else {
            strMap[str[i]] = 1;
        }
    }
    let oddCount = 0;
    for (var char in strMap) {
        if (strMap[char] % 2 !== 0) {
            oddCount++;
        }
        if (oddCount > 1) {
            return false;
        }
    }
    return true;
}

// console.log(includesPalindrome('racecar'))

// anagram grouping
// check word against other words
// if same length and same chars add to array


function groupAnagrams(arr) {


}


function group2(arr) {
    const result = {};

    // loop over array
    for (let word of arr) {
        let sorted = word.split('').sort().join('');
        if (result[sorted]) {
            result[sorted].push(word)
        } else {
            result[sorted] = [word];
        }
    }
    return Object.values(result);
}

// console.log(group2(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))


class HashNode {
    constructor(key, value, next) {
        this.key = key
        this.value = value
        this.next = next
    }
}

class HashMapSeparate {
    constructor(initialCapacity = 22) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            return 'Key error';
        }
        return this._hashTable[index].find(key);
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);
        console.log(index)
        if (this._hashTable[index]) {
            this._hashTable[index].insertLast(key, value);
        } else {
            this.length++;
            this._hashTable[index] = new LinkedList()
            this._hashTable[index].insertFirst(key, value)
        }   
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        // slot being the top of the LL obj
        if (slot.find(key) === undefined) {
            throw new Error('Key error');
        }
        slot.remove(key);
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;
        const index = start % this._capacity;
        // for (let i = start; i < start + this._capacity; i++) {
        //     const index = i % this._capacity;
        //     const slot = this._hashTable[index];
        //     if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        //         return index;
        //     }
        // }
        return index;
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negative number. 
        return hash >>> 0;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(key, value) {
        this.head = new HashNode(key, value, null);
    }

    insertLast(key, value) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            console.log(this.head);
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new HashNode(key, value, null);
        }
    }

    find(item) {
        //Start at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // Check for the item
        while (currNode.value !== item) {
            // return null if it's the end of the list
            // and the item is not on the list
            if (currNode.next === null) {
                return null;
            }
            else {
                // Otherwise, keep looking
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }

    remove(item) {
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node
            previousNode = currNode;
            currNode = currNode.next;
        }

        if(currNode == null) {
            console.log('Item not found');
            return
        }
        previousNode.next = currNode.next;
    }
}

function main2() {
    const newHash = new HashMapSeparate();
    newHash.set('key', 'value')
    newHash.set('key', 'value2')
    newHash.set('key', 'value3')
    return newHash._hashTable[0];
}

console.log(main2());







































































