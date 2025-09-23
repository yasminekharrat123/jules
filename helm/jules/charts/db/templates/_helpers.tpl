{{- define "db.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "db.fullname" -}}
{{ .Release.Name }}-{{ include "db.name" . }}
{{- end }}
