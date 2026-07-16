# Shared

Peças reutilizáveis entre páginas do **site** (não confundir com o design system).

Exemplos futuros:

```text
shared/
  header.dc.html
  footer.dc.html
  announcement.dc.html
  contact-form.dc.html
```

Enquanto o runtime for Design Canvas “página monólito”, o header/footer pode continuar embutido em cada `pages/<slug>/index.dc.html`.  
Quando extrair partials, documente em `specs/components/`.
