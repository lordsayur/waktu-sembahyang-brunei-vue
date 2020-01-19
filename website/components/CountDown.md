# CountDown

This component display the count down to next prayer time.

## Props

<!-- @vuese:CountDown:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|prayersData|Contains all data related about prayer time.|`Array`|`true`|-|
|TodayDate|Contain today's date. All today's date is shared from one source for easy debugging.|eslint-disable-next-line vue/require-prop-type-constructor|`true`|-|
|activeStart|The starting time value that need to be highlighted|`Number`|`true`|15|

<!-- @vuese:CountDown:props:end -->


## Events

<!-- @vuese:CountDown:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|preImsak|-|-|
|updatePrayerTime|Update prayer time.|The argument is an object value contain status of current time.|

<!-- @vuese:CountDown:events:end -->


