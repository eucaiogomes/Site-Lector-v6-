import React, { useEffect, useState } from 'react';

/**
 * Sidebar do admin — copiada de Tela-Recompensas-2.0 (réplica do menu lateral do Lector Live, UI 2026):
 * 220px, itens de 1º nível com ícone lector-icons 24px + rótulo + seta (icon-tip), item ativo com fundo
 * rgba(0,0,0,.25), barra laranja à direita e lupa (icon-spyglass); submenu plano ou em árvore (Relatórios);
 * rodapé "Lector Live © 2026 - v2.0" e botão laranja de recolher (só desktop).
 * Ícones: fonte lector-icons (src/lector-icons.css). Estilos: `.adm-side` / `.adm-sb-*` em admin.css.
 *
 * Menu do admin do site: por enquanto só Relatórios › Marketing Comercial › Leads site.
 * Para crescer, acrescente itens em MENU (os tipos já suportam submenu plano, árvore e seção própria).
 */

interface SubLink {
  /** Hash da seção (#usuarios, #loja…). */
  id: string;
  label: string;
}

interface TreeGroup {
  key: string;
  label: string;
  /** Hash do próprio nó (ex.: "Todos" de Treinamentos): o rótulo vira link e só o +/− expande/recolhe. */
  href?: string;
  items: SubLink[];
}

interface MenuItem {
  key: string;
  label: string;
  /** Classe da fonte lector-icons. */
  icon: string;
  /** Submenu plano. */
  sub?: SubLink[];
  /** Submenu em árvore (grupos expansíveis). */
  tree?: TreeGroup[];
  /** Seção própria (Trilhas, Treinamentos): o item abre #<section> e o submenu filtra por categoria (#<section>/<id>). */
  section?: string;
}

const MENU: MenuItem[] = [
  {
    key: 'relatorios',
    label: 'Relatórios',
    icon: 'icon-reports',
    tree: [
      {
        key: 'marketing-comercial',
        label: 'Marketing Comercial',
        items: [{ id: 'leads-site', label: 'Leads site' }],
      },
    ],
  },
];

const linksOf = (item: MenuItem): SubLink[] => item.sub ?? item.tree?.flatMap((g) => g.items) ?? [];

export interface AdminSidebarProps {
  /** Id (hash) da seção ativa. */
  activeId: string;
  /** Parte do hash depois da "/" (categoria de Trilhas/Treinamentos); vazia = nenhuma. */
  activeSub?: string;
  /** Gaveta aberta (mobile). */
  open: boolean;
}

const DESKTOP_QUERY = '(min-width: 1024px)';

function useIsDesktop() {
  const [is, setIs] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const on = () => setIs(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return is;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeId, activeSub = '', open }) => {
  const [collapsedState, setCollapsed] = useState(false);
  const isDesktop = useIsDesktop();
  const collapsed = collapsedState && isDesktop; // no mobile (gaveta) sempre expandido

  const active = activeId;
  /** Link de categoria ativo (#trilhas/<id>); vazio quando a seção está sem categoria. */
  const activeSubLink = activeSub ? `${activeId}/${activeSub}` : '';
  const isOn = (id: string) => id === active || id === activeSubLink;
  const activeKey = MENU.find((m) => m.section === active || linksOf(m).some((l) => l.id === active))?.key;

  // Submenu do item ativo: aberto por padrão; a seta alterna. Ao trocar de item ativo, volta a abrir.
  const [subState, setSubState] = useState<{ key?: string; open: boolean }>({ key: activeKey, open: true });
  const subOpen = subState.key === activeKey ? subState.open : true;
  const setSubOpen = (value: boolean) => setSubState({ key: activeKey, open: value });

  // Grupos da árvore (Relatórios): abertos por padrão.
  const [treeClosed, setTreeClosed] = useState<Record<string, boolean>>({});

  const renderSub = (item: MenuItem) => {
    const id = `adm-sb-sub-${item.key}`;
    if (item.sub) {
      return (
        <div className="adm-sb-sub" id={id} hidden={!subOpen}>
          <ul>
            {item.sub.map((link) => {
              const on = isOn(link.id);
              return (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={`adm-sb-sub-link${on ? ' is-active' : ''}`} aria-current={on ? 'page' : undefined}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    if (item.tree) {
      return (
        <div className="adm-sb-tree" id={id} hidden={!subOpen}>
          <ul className="adm-sb-tree-list">
            {item.tree.map((group) => {
              const groupOpen = !treeClosed[group.key];
              const groupId = `adm-sb-tree-${group.key}`;
              const toggleGroup = () => setTreeClosed((s) => ({ ...s, [group.key]: groupOpen }));
              const groupOn = !!group.href && group.href === active && !activeSubLink;
              return (
                <li key={group.key}>
                  {group.href ? (
                    <div className={`adm-sb-tnode is-split${groupOn ? ' is-active' : ''}`}>
                      <button
                        type="button"
                        className="adm-sb-texp-btn"
                        aria-expanded={groupOpen}
                        aria-controls={groupId}
                        aria-label={`${groupOpen ? 'Recolher' : 'Expandir'} ${group.label}`}
                        onClick={toggleGroup}
                      >
                        <i className={`adm-sb-texp ${groupOpen ? 'icon-minus' : 'icon-plus'}`} aria-hidden="true" />
                      </button>
                      <a href={`#${group.href}`} className="adm-sb-tlink" aria-current={groupOn ? 'page' : undefined}>
                        <span className="adm-sb-ttext">{group.label}</span>
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="adm-sb-tnode"
                      aria-expanded={groupOpen}
                      aria-controls={groupId}
                      onClick={toggleGroup}
                    >
                      <i className={`adm-sb-texp ${groupOpen ? 'icon-minus' : 'icon-plus'}`} aria-hidden="true" />
                      <span className="adm-sb-ttext">{group.label}</span>
                    </button>
                  )}
                  <ul id={groupId} hidden={!groupOpen}>
                    {group.items.map((link) => {
                      const on = isOn(link.id);
                      return (
                        <li key={link.id}>
                          <a
                            href={`#${link.id}`}
                            className={`adm-sb-tnode is-child${on ? ' is-active' : ''}`}
                            aria-current={on ? 'page' : undefined}
                          >
                            <span className="adm-sb-ttext">{link.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return null;
  };

  const renderItem = (item: MenuItem) => {
    const links = linksOf(item);
    const isActive = item.key === activeKey;
    const title = collapsed ? item.label : undefined;
    const content = (
      <>
        <i className={`adm-sb-ico ${item.icon}`} aria-hidden="true" />
        <span className="adm-sb-label adm-sb-hide">
          <span className="adm-sb-trunc">{item.label}</span>
        </span>
        {isActive && <i className="adm-sb-spy icon-spyglass adm-sb-hide" aria-hidden="true" />}
        <i className={`adm-sb-tip icon-tip adm-sb-hide${isActive && subOpen ? ' is-open' : ''}`} aria-hidden="true" />
      </>
    );

    // Sem tela no protótipo: só visual.
    if (links.length === 0) {
      return (
        <span className="adm-sb-row is-mock" aria-disabled="true" title={title}>
          {content}
        </span>
      );
    }

    // Item ativo: alterna o submenu (recolhido: expande a barra e mostra o submenu).
    // Seção com categoria escolhida (Trilhas/Treinamentos): volta para "todas" e mantém o submenu aberto.
    if (isActive) {
      return (
        <button
          type="button"
          className="adm-sb-row is-active"
          aria-label={item.label}
          title={title}
          aria-expanded={collapsed ? undefined : subOpen}
          aria-controls={collapsed ? undefined : `adm-sb-sub-${item.key}`}
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
              setSubOpen(true);
            } else if (item.section && activeSubLink) {
              window.location.hash = item.section;
              setSubOpen(true);
            } else {
              setSubOpen(!subOpen);
            }
          }}
        >
          {content}
        </button>
      );
    }

    // Item funcional inativo: abre a própria seção (Trilhas, Treinamentos) ou a 1ª seção do submenu.
    return (
      <a className="adm-sb-row" href={`#${item.section ?? links[0].id}`} aria-label={item.label} title={title}>
        {content}
      </a>
    );
  };

  return (
    <aside id="adm-side" className={`adm-side${open ? ' is-open' : ''}${collapsed ? ' is-collapsed' : ''}`}>
      <nav aria-label="Menu do admin" className="adm-sb-nav">
        <ul>
          {MENU.map((item) => (
            <li key={item.key} className="adm-sb-mi">
              {renderItem(item)}
              {item.key === activeKey && !collapsed && renderSub(item)}
            </li>
          ))}
        </ul>
      </nav>

      <div className="adm-sb-foot">
        <div className="adm-sb-foot-txt">Lector Live © 2026 - v2.0</div>
      </div>

      <button
        type="button"
        className="adm-sb-pin"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
        title={collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
        aria-expanded={!collapsed}
        aria-controls="adm-side"
      >
        <i className={collapsed ? 'icon-left-expand' : 'icon-left-collapse'} aria-hidden="true" />
      </button>
    </aside>
  );
};

export default AdminSidebar;
