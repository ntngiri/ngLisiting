 listingOptions = {
     multiselect: true,
     tupelCount: 10,
     maxHeight: 250
 }

 json = [{
     name: 'India',
     id: 'ind',
     notSelectable: true,
     list: [{
         name: 'Delhi',
         id: 'del',
         notSelectable: true,
         list: [{
             name: 'Khan market',
             id: 'khn',
             notSelectable: false,
             list: [{
                 name: 'Khan chacha',
                 id: 'khnCh',
                 notSelectable: false,
             }]
         }, {
             name: 'Connaught place',
             id: 'cp',
             notSelectable: false,
         }]
     }, {
         name: 'Mumbai',
         id: 'mbm',
         notSelectable: true,
         list: [{
             name: 'Nariman point',
             id: 'nrm',
             notSelectable: false,
         }, {
             name: 'Bandra',
             id: 'bnd',
             notSelectable: false
         }]
     }]
 }, {
     name: 'United states',
     id: 'us',
     notSelectable: true,
     list: [{
         name: 'Newyork',
         id: 'ny',
         notSelectable: false,
         list: [{
             name: 'Nyzone1',
             id: 'nz1',
             notSelectable: false
         }, {
             name: 'Nyzone2',
             id: 'nz2',
             notSelectable: false
         }]
     }, {
         name: 'New jersy',
         id: 'nj',
         notSelectable: false
     }]
 }]

 selectedIDs = ['bnd', 'del', 'nrm','nz2'];