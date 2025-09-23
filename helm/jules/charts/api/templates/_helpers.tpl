{{- define "api.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "api.fullname" -}}
{{ .Release.Name }}-{{ include "api.name" . }}
{{- end }}

{{- define "api.labels" -}}
app.kubernetes.io/name: {{ include "api.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end }}

{{- define "api.env" -}}
{{- range $key, $value := .Values.env }}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- end }}
- name: DB__DB_URI
  valueFrom:
    secretKeyRef:
      name: {{ include "api.fullname" . }}-secret
      key: DB__DB_URI
{{- end }}
