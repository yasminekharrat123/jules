{{- define "frontend.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "frontend.fullname" -}}
{{ .Release.Name }}-{{ include "frontend.name" . }}
{{- end }}

{{- define "frontend.env" -}}
{{- range $key, $value := .Values.env }}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- end }}
{{- end }}

