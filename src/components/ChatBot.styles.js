import { styled } from '@mui/material/styles';

export const FabButton = styled('button')(({ theme, isDark, primaryBg }) => ({
  position: 'fixed',
  bottom: 16,
  left: 16,
  backgroundColor: primaryBg,
  color: '#fff',
  '&:hover': {
    backgroundColor: primaryBg,
  },
  '&:active': {
    backgroundColor: primaryBg,
    color: '#fff',
  },
  '&:focus': {
    color: '#fff',
  },
}));

export const Overlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndex.modal + 1,
}));

export const ChatPaper = styled('div')(({ theme, isLandscape }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.modal + 2,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  ...(isLandscape
    ? {
        inset: '72px 0 10px 0',
        margin: '0 auto',
        width: '100%',
        maxWidth: 640,
      }
    : {
        bottom: 90,
        left: 16,
        width: 360,
        height: 520,
      }),
}));

export const HeaderBox = styled('div')(({ theme, primaryBg }) => ({
  padding: theme.spacing(1),
  backgroundColor: primaryBg,
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const SuggestionsBox = styled('div')(({ theme, isLandscape }) => ({
  padding: theme.spacing(1),
  ...(isLandscape && {
    display: 'flex',
    gap: theme.spacing(1),
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: theme.spacing(1),
  }),
}));

export const MessagesBox = styled('div')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  overflowY: 'auto',
}));

export const MessageBubble = styled('div')(({ theme, isUser, isDark }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5, 1),
  borderRadius: 8,
  backgroundColor: isUser
    ? isDark
      ? theme.palette.primary.light
      : theme.palette.primary.main
    : isDark
    ? 'rgba(255,255,255,0.10)'
    : 'rgba(0,0,0,0.06)',
  color: isUser
    ? isDark
      ? '#000'
      : '#fff'
    : 'inherit',
  whiteSpace: 'pre-line',
}));

export const InputBox = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1),
}));
