package util

import (
	"strings"
	"time"
)

/*
* TRIM SPACES IN STRINGS
* @params
* s string
*/
func TrimSpaces(s string) string {
	newString := strings.TrimSpace(s)
	return newString
}

/*
* FIND STRING IN SPLICE(ARRAY)
* @params
* source map[string]string
* value string
*/
func FindStringInSplice(source map[string]string, value string) bool {
	if source[value] != "" {
		return true
	}

	return false
}

/*
* PARSE STRING DATE TO RFC3339 LAYOUT time.Time
* @params
* value string
*/
func parseDate(value string) (time.Time, error) {
	layout := time.RFC3339[:len(value)]
	return time.Parse(layout, value)
 }