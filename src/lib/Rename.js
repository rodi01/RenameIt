/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-11-17T17:23:24-08:00
 * @Project: Rename It
 * @Last modified time: 2017-12-02T10:17:35-08:00
 */

import changeCase from 'change-case';

 /**
  * Rename layer name
  * @param  {{layerName: string, currIdx: number, width: number, height: number, startsFrom: number, pageName: string, inputName: string}} options
  * @return {string}         Renamed Layer Name
  */
export default function rename(options) {
 let newLayerName = options.inputName;

 // Interator
 const nInterators = newLayerName.match(/%N+/ig);
 const aInterators = newLayerName.match(/%A/ig);

 // Number Interator
 if (nInterators != null) {
   // Replace Number
   function replaceNumber(match) {
     let nnSize = match.length - 1;
     const letter = match.charAt(1);
     let num = (letter == "N") ? options.currIdx : options.selectionCount - options.currIdx - 1;
     num += options.startsFrom;

     // Check weather or not the number is bigger than the nnSizes (works up to 9999)
     if (num > 999 && (nnSize == 1 || nnSize == 2 || nnSize == 3))
       nnSize = 4
     else if (num > 99 && (nnSize == 1 || nnSize == 2))
       nnSize = 3
     else if (num > 9 && nnSize == 1)
       nnSize = 2

     return paddy(num, nnSize);
   }

   newLayerName = newLayerName.replace(/\%n+/ig, replaceNumber);
 }

 // Alpha Interator
 if (aInterators != null) {
   const alphaStr = "abcdefghijklmnopqrstuvwxyz";
   let alphaArr = alphaStr.split("");
   const totalAlpha = alphaArr.length;

   // Replace Alpha
   function replaceAlpha(match)
   {
     const letter = match.charAt(1);
     let alpha	= alphaArr[options.currIdx % totalAlpha];

       if (options.currIdx >= totalAlpha)
       {
         var flIdx = Math.floor(currIdx / totalAlpha);
         alpha = `${alphaArr[flIdx - 1]}${alpha}`
       }

     return (letter == "A") ? alpha.toUpperCase() : alpha
   }

   newLayerName = newLayerName.replace(/\%a/ig, replaceAlpha);
 }

 // Replace plus
 newLayerName = newLayerName.replace(/(\\\+)|\+/, (_, a) => { return a || options.layerName });

 // Replace escaped plus
 newLayerName = newLayerName.replace(/\\\+/g, "+");

 // Replace asterisks
 newLayerName = currentLayer(newLayerName, options.layerName)

 // Replace escaped asterisks
 // newLayerName = newLayerName.replace(/\\\*/g, "*");

 // Add Width and/or height
 newLayerName = newLayerName.replace(/%w/ig, options.width);
 newLayerName = newLayerName.replace(/%h/ig, options.height);

 // Page Name
 newLayerName = newLayerName.replace(/%p/ig, options.pageName);

 // Parent Name
 newLayerName = newLayerName.replace(/%o/ig, options.parentName);

 // Return new name
 return newLayerName;
}

 function paddy(n, p, c) {
   let pad_char = typeof c !== 'undefined' ? c : '0';
   let pad = new Array(1 + p).join(pad_char);
   return (pad + n).slice(-pad.length);
 }

 function currentLayer(newLayerName, layerName) {
   // UpperCase
   let name = newLayerName.replace(/%\*u%/ig, changeCase.upperCase(layerName))

   // LowerCase
   name = name.replace(/%\*l%/ig, changeCase.lowerCase(layerName))

   // Title Case
   name = name.replace(/%\*t%/ig, changeCase.titleCase(layerName))

   // UpperCase First
   name = name.replace(/%\*uf%/ig, changeCase.upperCaseFirst(layerName))

   // UpperCase First
   name = name.replace(/%\*c%/ig, changeCase.camelCase(layerName))


   // Layername
   name = name.replace(/%\*/g, layerName)

   return name
 }
