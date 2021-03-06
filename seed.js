/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};
var seedUsers = function () {
    var users = [
        {
            email: 'jimmy@fsa.com',
            password: 'password',
            role: 'admin',
            firstName: 'Jimmy',
            lastName: 'Farrell',
            shippingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            },
            billingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            }
        },
        {
            email: 'alex@fsa.com',
            password: 'password',
            role: 'admin',
            firstName: 'Alex',
            lastName: 'Wang',
            shippingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            },
            billingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            }
        },
        {
            email: 'dj@fsa.com',
            password: 'password',
            role: 'admin',
            firstName: 'DJ',
            lastName: 'Nadgar',
            shippingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            },
            billingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            }
        },
        {
            email: 'steve@fsa.com',
            password: 'password',
            role: 'admin',
            firstName: 'Steve',
            lastName: 'Kwak',
            shippingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            },
            billingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            }
        },
        {
            email: 'testing@fsa.com',
            password: 'password',
            role: 'user',
            firstName: 'Fullstack',
            lastName: 'Academy',
            shippingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            },
            billingAddress: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            }
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            role: 'user',
            firstName: 'Barack',
            lastName: 'Obama',
            shippingAddress: {
                line1: '1 White House',
                line2: 'Oval Office',
                city: 'Capital',
                state: 'Washington D.C.',
                zip: '11111'
            },
            billingAddress: {
                line1: '1 White House',
                line2: 'Oval Office',
                city: 'Capital',
                state: 'Washington D.C.',
                zip: '11111'
            }
        }
    ];
    return q.invoke(User, 'create', users);

};
var seedCategories = function () {
    var categories = [
        {name: 'Red'},
        {name: 'White'},
        {name: 'Sparkling'},
        {name: 'Cider'}
    ];
    return q.invoke(Category, 'create', categories);

};
var seedProducts = function () {
    var redCat;
    var whiteCat;
    var sparklingCat;
    var ciderCat;
    return Category.findOne({name: 'Red'}).exec()
    .then(function(category) {
        redCat = category._id;
    })
    .then(function() {
        return Category.findOne({name: 'White'}).exec()
    })
    .then(function(category) {
        whiteCat = category._id;
    })
    .then(function() {
        return Category.findOne({name: 'Sparkling'}).exec()
    })
    .then(function(category) {
        sparklingCat = category._id;
    })
    .then(function() {
        return Category.findOne({name: 'Cider'}).exec()
    })
    .then(function(category) {
        ciderCat = category._id;
    })
    .then(function() {
        return User.findOne({email:'obama@gmail.com'}).exec()
    })
    .then(function(user){
        var products = [
            {
                name: 'Canada Negra',
                image: 'https://s3.amazonaws.com/winen/canada-negra.jpg',
                description: {
                  review: 'This is a very fancy red wine',
                  winery: 'Bodegas Enguera',
                  origin: 'Spain, Valencia',
                  'do': 'Valencia',
                  grapes: 'Tempranillo, Syrah',
                  taste: ['light'],
                  serves: '14 - 16',
                  vintage: null,
                  aoc: ''
                },
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: [redCat]
            },
            {
              name: 'Cote Chalonnaise',
              image: 'https://s3.amazonaws.com/winen/06.jpg',
              description: {
                review: 'This is a very fancy red wine',
                winery: 'Guy Chaumont',
                origin: 'France, Bourgogne Cote Chalonnaise',
                'do': '',
                grapes: 'Pinot Noir',
                taste: ['light'],
                serves: '12',
                vintage: 2010,
                aoc: 'Bourgogne Cote Chalonnaise'
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: [redCat]
            },
            {
              name: 'Tournage riant',
              image: 'https://s3.amazonaws.com/winen/03.jpg',
              description: {
                review: 'This is a very fancy red wine',
                winery: 'Touraine',
                origin: 'France, Touraine',
                'do': '',
                grapes: 'Pinot Noir',
                taste: ['full'],
                serves: '14',
                vintage: null,
                winery: 'Fanny Sabre',
                aoc: 'Beaune ler Cru'
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: [redCat]
              }, {
              name: 'Pommard \<Les Vignots\>',
              image: 'https://s3.amazonaws.com/winen/02.jpg',
              description: {
                review: 'This is a very fancy red wine',
                winery: 'Chantal Lescure',
                origin: 'France, Bourgogne',
                'do': '',
                grapes: 'Pinot Noir',
                taste: ['medium', 'full'],
                vintage: null,
                aoc: ''
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: [redCat]
            },{
            name: 'Cremant Brut Zero',
            image: 'https://s3.amazonaws.com/winen/01.jpg',
            description: {
              review: 'This is a wine with many bubbles',
              winery: 'Guy Chaumont',
              origin: 'France, Bourgogne',
              'do': '',
              grapes: 'Chardonnay 70%, Aligote 30%',
              taste: ['bubbly'],
              serves: '13',
              vintage: null,
              aoc: ''
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: [sparklingCat]
          }, {
              name: 'Trinquames',
              image: 'https://s3.amazonaws.com/winen/04.jpg',
              description: {
                review: 'This is another cidre',
                winery: 'Touraine',
                origin: 'Normandie, France',
                'do': '',
                grapes: 'five kinds of variety',
                taste: ['medium'],
                serves: '14',
                vintage: null,
                aoc: ''
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: [ciderCat]
            }, {
            name: 'Poire authentique',
            image: 'https://s3.amazonaws.com/winen/08.jpg',
            description: {
              review: 'This is a cidre',
              winery: 'Eric Bordelet',
              origin: 'Normandie, France',
              'do': '',
              grapes: 'another grapish korean immigrant to france',
              taste: ['full'],
              serves: '15',
              vintage: null,
              aoc: ''
              },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: [ciderCat]
            }, {
                name: 'Pouilly Fuisse',
                image: 'https://s3.amazonaws.com/winen/011.jpg',
                description: {
                    review: 'This is a very fancy red wine',
                    winery: 'Philippe Valette',
                    origin: 'France, Macon',
                    'do': '',
                    grapes: 'Chardonnay 100%',
                    taste: ['light'],
                    serves: '12',
                    vintage: null,
                    aoc: ''
                },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: [ciderCat]
            }, {
            name: 'Tradition',
            image: 'https://s3.amazonaws.com/winen/013.jpg',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Leon Barral',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Cinsault, Grenache, carignan',
              taste: ['medium', 'full'],
              serves: '',
              vintage: null,
              aoc: ''
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: [redCat]
          }, {
            name: 'Bel Air',
            image: 'https://s3.amazonaws.com/winen/09.jpg',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'La Grange Tiphaine',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Syrah, Grenache, carignan',
              taste: ['full'],
              serves: '14',
              vintage: null,
              aoc: 'Faugeres'
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: [redCat]
          }, {
            name: 'Pommard',
            image: 'https://s3.amazonaws.com/winen/014.jpg',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Les Vignots',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Mourvedre 80%, Syrah 20%',
              taste: ['full'],
              serves: '12',
              vintage: null,
              aoc: 'Faugeres'
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: [redCat]
          }, {
            name: 'Prelude',
            image: 'https://s3.amazonaws.com/winen/07.jpg',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Mas Lumen',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Carignan 50%, Syrah 27%, Cinsault 13%, Grenache 10%',
              taste: [],
              serves: '16',
              vintage: null,
              aoc: ''
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: [redCat]
          }, {
                name: 'Finca Enguera Blanc',
                image: 'https://s3.amazonaws.com/winen/012.jpg',
                description: {
                    review: 'This is a very fancy red wine',
                    winery: 'Bodegas Enguera',
                    origin: 'Spain, Valencia',
                    'do': 'Valencia',
                    grapes: 'Verdil 100%',
                    taste: ['medium'],
                    serves: '10',
                    vintage: null,
                    aoc: ''
                },
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: [whiteCat]
            },
            {
                name: 'Pouilly Fuisse Tradition',
                image: 'https://s3.amazonaws.com/winen/010.jpg',
                description: {
                    review: 'This is a very fancy red wine',
                    winery: 'Philippe Valette',
                    origin: 'France, Macon',
                    'do': '',
                    grapes: 'Chardonnay 100%',
                    taste: ['light'],
                    serves: '10',
                    vintage: null,
                    aoc: ''
                },
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: [whiteCat]
            },
            {
                name: 'Les Vignes de mon Pere',
                image: 'https://s3.amazonaws.com/winen/05.jpg',
                description: {
                    review: 'This is a very fancy red wine',
                    winery: 'Philippe Valette',
                    origin: 'France, Macon',
                    'do': '',
                    grapes: 'Chardonnay 100%',
                    taste: ['light'],
                    serves: '10',
                    vintage: null,
                    aoc: ''
                },
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: [whiteCat]
            },
            {
                name: 'Vin Juane',
                image: 'https://s3.amazonaws.com/winen/vin-jaune.jpg',
                description: {
                    review: 'This is a very fancy red wine',
                    winery: 'Domaine Ganevat',
                    origin: 'France, Jura',
                    'do': '',
                    grapes: 'Savagrin 100%',
                    taste: ['medium'],
                    serves: '10',
                    vintage: null,
                    aoc: ''
                },
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: [whiteCat]
            }

        ];
        return q.invoke(Product, 'create', products);
        });

    };



connectToDb.then(function () {
    //mongoose.connection.db.dropDatabase(function() {
        getCurrentUserData().then(function (users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                //process.kill(0);
            }
        }).then(function () {

            return seedCategories();
        }).then(function () {

            return seedProducts();
        }).then(function () {

            process.kill(0);
        }).catch(function (err) {
            console.error(err);
            process.kill(1);
        });
    //});
});
