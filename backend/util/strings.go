package util

import "strings"

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