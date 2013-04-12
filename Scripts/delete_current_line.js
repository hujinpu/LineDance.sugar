action.performWithContext = function (context, outError) {
	// Grab our current selected range
	var range = context.selectedRanges[0]
	// Check to see if the selection spans multiple lines
	var deleteRange
	
	if (range.length > 0) {
		// Grab the range for the lines our selection spans
		deleteRange = context.lineStorage.lineRangeForRange(range)
	} else {
	    // not select any text
		deleteRange = context.lineStorage.lineRangeForIndex(range.location)
	}

	// If on the last line of the doc, remove the line break prior to the line
	// This isn't strictly necessary, but it's nice to have
	// deleteRange.location + deleteRangeLoc is the range's last char's index
	var deleteRangeLoc = (deleteRange.length === 0) ? deleteRange.length : deleteRange.length - 1,
		lineRange = context.lineStorage.lineNumberForIndex(deleteRange.location + deleteRangeLoc)
	// check if the line is the last line of the docuemnt
	if (lineRange === context.lineStorage.numberOfLines && lineRange !== 1) {
		deleteRange = new Range(deleteRange.location - 1, deleteRange.length + 1)
	}

	// Create our recipe, add deleted range, and apply it
	var recipe  = new CETextRecipe()
	recipe.deleteRange(deleteRange)
	return context.applyTextRecipe(recipe)
};