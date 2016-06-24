function DeepEqual(a, b) {
	//If both objects, do special stuff
	if (typeof a == 'object' && typeof b == 'object')
	{
		//Check if null
		if (a && b)
		{
			// Before we get going lets first count the number of their properties
			var numPropsA = 0;
			var numPropsB = 0;
			for (var prop in a)
				numPropsA++;
			for (var prop in b)
				numPropsB++;
			if (numPropsA != numPropsB)
				return false;
			else
			{
				var propExists = function (p, obj)
				{
					for (var i in obj)
						if (p == i)
							return true;
					return false;
				}
				for (var prop in a)
				{
					//Check if this property exists
					if (propExists(prop, b))
					{
						//Magic happens here
						if (!DeepEqual(a[prop], b[prop]))
						{
							return false;
						}
					}
					else
					{
						return false;
					}
				}
				return true; //YAY!!
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		return a === b;
	}
};

var obj = {here: {is: "an"}, object: 2};
console.log(DeepEqual(obj, obj)); // -> true
console.log(DeepEqual(obj, {here: 1, object: 2})); // -> false
console.log(DeepEqual(obj, {here: {is: "an"}, object: 2})); // -> true