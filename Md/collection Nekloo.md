# Vagabond
``` json
[
	{
		"id" : unique,
		"mail" : string,
		"pseudo" : string,
		"password" : string,
		"birthday" : date,
		"likes" : [
			{
				"id" : string,
				"name" : strong,
				"address" : {
					"latitude" : float,
					"longitude" : float,
					"city" : string,
					"country" : string,
					"postcode" : int,
					"street" : string
				},
				"image" : string,
				"activities" : [
					{
						"activity_id" : {
							"name" : string,
							"illustration" : string
						}
					}
				],
			}
		], ...
	}, ...
]
```
# Admin
``` json
[
	{
		"id" : unique,
		"mail" : string,
		"pseudo" : string,
		"password" : string,
	}, ...
]
```

# Place
``` json
[
	{
		"id" : unique,
		"name" : string,
		"address" : {
			"latitude" : float,
			"longitude" : float,
			"city" : string,
			"country" : string,
			"postcode" : int,
			"street" : string
		},
		"images" : {
			"storefront" : string,
			"logo" : string,
			"inside" : string,
			"food" : string
		},
		"menu" : string,
		"advertisement_link" : string,
		"activities" : [
			{
				"activity_id" : {
					"name" : string,
					"illustration" : string
				}
			}
		],
		"planning" : {
			"monday" : [{"startTime": time, "endTime" : time}],
			"tuesday" : [{"startTime": time, "endTime" : time}],
			"wednesday" : [{"startTime": time, "endTime" : time}],
			"thirsday" : [{"startTime": time, "endTime" : time}],
			"friday" : [{"startTime": time, "endTime" : time}],
			"saturday" : [{"startTime": time, "endTime" : time}],
			"sunday" : [{"startTime": time, "endTime" : time}],
			"publicHollidays" : boolean
		}
	}, ...
]
```
# Activity
``` json
[
	{
		"id" : unique,
		"name" : string,
		"illustration" : string
	}, ...
]
```
# Supposition
``` json
[
	{
		"vagabond_id" : [
		{
			"id" : unique,
			"name" : string,
			"address" : {
				"latitude" : float,
				"longitude" : float,
				"city" : string,
				"country" : string,
				"postcode" : int,
				"street" : string
			},
			"images" : {
				"storefront" : string,
				"logo" : string,
				"inside" : string,
				"food" : string
			},
	
		}, ...]}
]
```
