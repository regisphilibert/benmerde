{{- /* Each custom transformers can use "transformers/default" as a base of key/values */ -}}
{{- partial "transformers/default.tpl" . -}}
{{- range $display, $key := dict "lieu" "residency" "projets" "events" -}}
	{{- with index $.Params $key }}
		{{- $.Scratch.SetInMap "item" $display . -}}
	{{- end -}}	
{{- end -}}